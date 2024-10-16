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
  get_votes_user: protectedProcedure
    .query(async ({ ctx }) => {
      const movies = await ctx.db.movieVote.findMany({
        orderBy: { createdAt: "desc" },
        where: { createdBy: { id: ctx.session.user.id } },
        include: {
          movie: true
        }
      });

      return movies ?? null;
    }),
  update_movie_vote: protectedProcedure
    .input(z.object({
      id: z.number(),
      vote: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.movieVote.update({
        where: { id: input.id, createdById: ctx.session.user.id },
        data: { vote: input.vote }
      })
    })
});
