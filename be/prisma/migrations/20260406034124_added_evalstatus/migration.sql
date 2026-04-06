-- CreateEnum
CREATE TYPE "EvalStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- AlterTable
ALTER TABLE "CandidateScore" ADD COLUMN     "failReason" TEXT,
ADD COLUMN     "status" "EvalStatus" NOT NULL DEFAULT 'PENDING';
