/*
  Warnings:

  - A unique constraint covering the columns `[clerkOrgId]` on the table `Enterprise` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clerkOrgId` to the `Enterprise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Enterprise" ADD COLUMN     "clerkOrgId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Enterprise_clerkOrgId_key" ON "Enterprise"("clerkOrgId");
