/*
  Warnings:

  - A unique constraint covering the columns `[clerkId]` on the table `Candidate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clerkId` to the `Candidate` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_jobId_fkey";

-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "clerkId" TEXT NOT NULL,
ALTER COLUMN "resume_data" DROP NOT NULL,
ALTER COLUMN "jobId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_clerkId_key" ON "Candidate"("clerkId");

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE SET NULL ON UPDATE CASCADE;
