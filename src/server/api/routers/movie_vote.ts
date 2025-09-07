import { Decimal } from "@prisma/client/runtime/library";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
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
        where: { createdBy: { id: ctx.session.user.id }, vote: { gt: 0 } },
        include: {
          movie: true
        }
      });

      return movies ?? null;
    }),
  update_movie_vote: protectedProcedure
    .input(z.object({
      id: z.number(),
      movieId: z.number(),
      vote: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      const movieVote = await ctx.db.movieVote.upsert({
        where: { id: input.id, createdById: ctx.session.user.id },
        update: { vote: input.vote },
        create: {
          movieId: input.movieId,
          vote: input.vote,
          createdById: ctx.session.user.id,
        }
      })

      const MovieVotes = await ctx.db.movieVote.findMany({
        where: { movieId: input.movieId, vote: { gt: 0 } }
      })

      if (MovieVotes && MovieVotes.length > 0) {
        const totalVotes = MovieVotes.reduce((acc, vote) => acc + vote.vote, 0);
        const avgVote = totalVotes / MovieVotes.length;
        await ctx.db.movie.update({
          where: { id: input.movieId },
          data: { vote_average: parseFloat(avgVote.toFixed(1)) as unknown as Decimal, vote_count: MovieVotes.length }
        })
      }


      return movieVote;
    })
});
