import { Movie, MovieVote } from "@prisma/client";
import { time } from "console";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const movieRouter = createTRPCRouter({
  movie: protectedProcedure
    .input(
      z.object({
        movieId: z.number(),
        title: z.string(),
        original_title: z.string(),
        genre: z.string(),
        genres: z.string(),
        release_date: z.string(),
        overview: z.string(),
        vote_average: z.number(),
        vote_count: z.number(),
        popularity: z.number(),
        adult: z.boolean(),
        backdrop_path: z.string(),
        original_language: z.string(),
        poster_path: z.string(),
        video: z.boolean(),
        cast: z.string(),
        direct: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.movie.create({
        data: {
          movieId: input.movieId,
          title: input.title,
          original_title: input.original_title,
          genre: input.genre,
          genres: input.genres,
          release_date: input.release_date,
          overview: input.overview,
          vote_average: input.vote_average,
          vote_count: input.vote_count,
          popularity: input.popularity,
          adult: input.adult,
          backdrop_path: input.backdrop_path,
          original_language: input.original_language,
          poster_path: input.poster_path,
          video: input.video,
          cast: input.cast,
          direct: input.direct,
        },
      });
    }),
  getRandomMovie: publicProcedure.query(async ({ ctx }) => {
    let movieNumber: number;
    let movieVotedUser: MovieVote | null;

    do {

      movieNumber = Math.floor(Math.random() * 3600) + 1;
      movieVotedUser = await ctx.db.movieVote.findFirst({
        where: { movieId: movieNumber, createdById: ctx.session?.user.id }
      })
    } while (movieVotedUser != null)


    const movie = await ctx.db.movie.findFirst({
      where: { id: movieNumber },
    });

    // setTimeout(() => {}, 1888000);
    return movie ?? null;
  }),
});
