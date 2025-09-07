import { db } from "~/server/db";

const updateAverageVoteCount = async () => {
    const MovieVotes = await db.movieVote.findMany({
        include: { movie: true },
        where: { vote: { gt: 0 } } // Only consider votes greater than 0
    });

    if (!MovieVotes || MovieVotes.length === 0) {
        console.log("No movie votes found.");
        return;
    }

    // Map to hold total votes and count per movieId
    const movieVoteMap: Record<number, { totalVotes: number; voteCount: number }> = {};

    MovieVotes.forEach((vote) => {
        if (!vote.movieId) return;

        // if (!movieVoteMap[vote.movieId]) {
        //   movieVoteMap[vote.movieId] = { totalVotes: 0, voteCount: 0 };
        // }

        movieVoteMap[vote.movieId] ??= { totalVotes: 0, voteCount: 0 };
        movieVoteMap[vote.movieId]!.totalVotes += vote.vote;
        movieVoteMap[vote.movieId]!.voteCount += 1;
    });

    for (const movieId in movieVoteMap) {
        const { totalVotes, voteCount } = movieVoteMap[movieId] as { totalVotes: number; voteCount: number };
        const avgVote = totalVotes / voteCount;

        await db.movie.update({
            where: { id: parseInt(movieId) }, // ✅ use movieId, not id
            data: {
                vote_average: parseFloat(avgVote.toFixed(2)), // Prisma handles Decimal conversion
                vote_count: voteCount,
            },
        });
    }

    console.log("Average votes and counts updated for all movies.");
};

updateAverageVoteCount().catch((err) => {
    console.error("Error updating average votes and counts:", err);
});
