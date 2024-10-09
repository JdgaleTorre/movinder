import { Movie } from "@prisma/client";
import { time } from "console";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const movieVoteRouter = createTRPCRouter({
  movie_vote: protectedProcedure
    .input(
      z.object({
        movieId: z.number(),
        vote: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.movieVote.create({
        data: {
          movieId: input.movieId,
          vote: input.vote,
          createdById: ctx.session.user.id,
        },
      });
    }),
});
