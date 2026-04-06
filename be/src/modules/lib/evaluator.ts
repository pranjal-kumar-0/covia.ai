import { GoogleGenAI } from "@google/genai";
import { CandidateWithJobAndScore } from "../candidate/candidate.types";
import { markCandidateCompleted, markCandidateFailed } from "../candidate/candidate.service";

const genAI = new GoogleGenAI({});

const BATCH_SIZE = 10;
const BATCH_DELAY_MS = 1000;
const MODEL = process.env.GEMINI_EVALUATION_MODEL;

export const evaluateCandidates = async (candidates: CandidateWithJobAndScore[]) => {
    const batches = chunkArray(candidates, BATCH_SIZE);

    for (const batch of batches) {
        await Promise.allSettled(batch.map(evaluateSingle));
        await sleep(BATCH_DELAY_MS);
    }

    console.log(`Evaluation complete. Processed ${candidates.length} candidates.`);
}

const evaluateSingle = async (candidate: CandidateWithJobAndScore) => {
    try {
        const score = await callGemini(candidate);
        await markCandidateCompleted(candidate.id, score);
        console.log(`Candidate ${candidate.id} scored: ${score}`);
    } catch (err: any) {
        await markCandidateFailed(candidate.id, err?.message ?? "Unknown error");
        console.error(`Candidate ${candidate.id} failed:`, err?.message);
    }
}

const callGemini = async (candidate: CandidateWithJobAndScore): Promise<number> => {
    const prompt = `
    You are an expert recruiter evaluating a candidate for a job position.
    JOB TITLE: ${candidate.job!.title}
    JOB DESCRIPTION: ${candidate.job!.description}
    RESUME DATA:
    ${candidate.resume_data}
    Score this candidate from 0 to 100 based on how well their profile matches the job.
    Consider: relevant skills, experience, education, and overall fit.

    Respond with ONLY a JSON object, no extra text:
    {"score": <number between 0 and 100>}`;

    const response = await genAI.models.generateContent({ 
        model: `${MODEL}`,
        contents: prompt
    });
    
    if (!response.text) {
        throw new Error("No response text from Gemini API");
    }

    const text = response.text.trim();
    const match = text.match(/\{\s*"score"\s*:\s*(\d+)\s*\}/);
    if (!match) {
        throw new Error(`Could not extract score from response: ${text}`);
    }

    const score = parseInt(match[1], 10);
    if (isNaN(score) || score < 0 || score > 100) {
        throw new Error(`Score out of range: ${score}`);
    }
    return score;
}


//utils :pray:
const chunkArray = <T>(arr: T[], size: number): T[][] =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
        arr.slice(i * size, i * size + size)
    );

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));