-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MovieVote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "movieId" INTEGER NOT NULL,
    "vote" INTEGER NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MovieVote_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MovieVote_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MovieVote" ("createdAt", "createdById", "id", "movieId", "vote") SELECT "createdAt", "createdById", "id", "movieId", "vote" FROM "MovieVote";
DROP TABLE "MovieVote";
ALTER TABLE "new_MovieVote" RENAME TO "MovieVote";
CREATE UNIQUE INDEX "MovieVote_movieId_createdById_key" ON "MovieVote"("movieId", "createdById");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
