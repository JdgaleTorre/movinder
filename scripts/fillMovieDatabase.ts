import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse/sync"; // synchronous parser
import { db } from "~/server/db";

type Movie = {
  movieId: number;
  title: string;
  original_title: string;
  genre: string;
  genres: string;
  release_date: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  backdrop_path: string;
  original_language: string;
  poster_path: string;
  video: boolean;
  cast: string;
  direct: string;
  combined_features: string;
};

const fillMovies = async () => {
  const csvFilePath = path.resolve("./Movies.csv");
  const fileContent = fs.readFileSync(csvFilePath, { encoding: "utf-8" });


  // Parse CSV synchronously
  const records: Movie[] = parse(fileContent, {
    columns: true, 
    skip_empty_lines: true,
  }) as unknown as Movie[];

  const filtered = records.map((row: Movie) => ({
    movieId: Number(row.movieId),
    title: row.title,
    original_title: row.original_title,
    genre: row.genre,
    genres: row.genres,
    release_date: row.release_date,
    overview: row.overview,
    vote_average: Number(row.vote_average) || 0,
    vote_count: Number(row.vote_count) || 0,
    popularity: Number(row.popularity) || 0,
    // adult: row.adult === "true" || row.adult === "1",
    backdrop_path: row.backdrop_path,
    original_language: row.original_language,
    poster_path: row.poster_path,
    // video: row.video === "true" || row.video === "1",
    cast: row.cast,
    direct: row.direct,
    combined_features: row.combined_features,
  }));

  for (const movie of filtered) {
    // Convert numbers/booleans
    movie.movieId = Number(movie.movieId);
    movie.vote_average = Number(movie.vote_average) || 0;
    movie.vote_count = Number(movie.vote_count) || 0;
    movie.popularity = Number(movie.popularity) || 0;
    // movie.adult = movie.adult === "true" || movie.adult === "1";
    // movie.video = movie.video === "true" || movie.video === "1";

    try {
      const created = await db.movie.create({
        data: movie,
      });
      console.log(`Inserted: ${created.title} (movieId: ${created.movieId})`);
    } catch (err: any) {
      console.error(`Failed to insert movieId ${movie.movieId}: ${err.message}`);
    }
  }
};

await fillMovies();
