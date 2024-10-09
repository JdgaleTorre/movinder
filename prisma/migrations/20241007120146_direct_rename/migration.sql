/*
  Warnings:

  - You are about to drop the column `director` on the `Movie` table. All the data in the column will be lost.
  - Added the required column `direct` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "movieId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "original_title" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "genres" TEXT NOT NULL,
    "release_date" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "vote_average" DECIMAL NOT NULL,
    "vote_count" INTEGER NOT NULL,
    "popularity" DECIMAL NOT NULL,
    "adult" BOOLEAN NOT NULL,
    "backdrop_path" TEXT NOT NULL,
    "original_language" TEXT NOT NULL,
    "poster_path" TEXT NOT NULL,
    "video" BOOLEAN NOT NULL,
    "cast" TEXT NOT NULL,
    "direct" TEXT NOT NULL
);
INSERT INTO "new_Movie" ("adult", "backdrop_path", "cast", "genre", "genres", "id", "movieId", "original_language", "original_title", "overview", "popularity", "poster_path", "release_date", "title", "video", "vote_average", "vote_count") SELECT "adult", "backdrop_path", "cast", "genre", "genres", "id", "movieId", "original_language", "original_title", "overview", "popularity", "poster_path", "release_date", "title", "video", "vote_average", "vote_count" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
