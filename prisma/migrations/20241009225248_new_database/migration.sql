/*
  Warnings:

  - A unique constraint covering the columns `[movieId,createdById]` on the table `MovieVote` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MovieVote_movieId_createdById_key" ON "MovieVote"("movieId", "createdById");
