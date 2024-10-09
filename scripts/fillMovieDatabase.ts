import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse";
import { db } from "../src/server/db";

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
};

const fillMovies = async () => {
  const csvFilePath = path.resolve("./scripts/Movies.csv");

  const headers = [
    "movieId",
    "title",
    "original_title",
    "genre",
    "genres",
    "release_date",
    "overview",
    "vote_average",
    "vote_count",
    "popularity",
    "adult",
    "backdrop_path",
    "original_language",
    "poster_path",
    "video",
    "cast",
    "direct",
  ];

  const fileContent = fs.readFileSync(csvFilePath, { encoding: "utf-8" });

  parse(
    fileContent,
    {
      delimiter: ",",
      columns: headers,
      fromLine: 2,
    },
    async (error, result: Movie[]) => {
      if (error) {
        console.error(error);
      }

      // Cast numbers and booleans appropriately
      result.forEach((movie) => {
        movie.movieId = Number(movie.movieId);
        movie.vote_average = Number(movie.vote_average);
        movie.vote_count = Number(movie.vote_count);
        movie.popularity = Number(movie.popularity);
        movie.adult = movie.adult === "TRUE" || movie.adult === "1"; // Convert to boolean
        movie.video = movie.video === "TRUE" || movie.video === "1"; // Convert to boolean

        // console.log(movie.movieId)
      });

    //   console.log(result.filter((movie)=> Number.isNaN(movie.movieId) ))

        const creation = await db.movie.createMany({data: result});

        console.log(creation)
    },
  );
};

fillMovies();
