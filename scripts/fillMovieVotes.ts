import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse/sync";
import { db } from "~/server/db";

type VoteRow = {
  movieId: number;
  vote: number;
  createdById: string;
  createdAt?: string;
};

const fillVotes = async () => {
  const csvFilePath = path.resolve("./MoviesVotes.csv");
  const fileContent = fs.readFileSync(csvFilePath, "utf-8");

  // Parse CSV synchronously
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  }) as unknown as VoteRow[];

  // 1️⃣ Prepare unique placeholder users
  const uniqueUserIds = Array.from(new Set(records.map(r => r.createdById)));

  const usersToCreate = uniqueUserIds.map(userId => ({
    id: userId,
    name: `Placeholder ${userId}`,
  }));

  // Upsert all users in bulk
  await Promise.all(
    usersToCreate.map(user =>
      db.user.upsert({
        where: { id: user.id },
        update: {}, // do nothing if exists
        create: user,
      })
    )
  );
  console.log(`Upserted ${usersToCreate.length} placeholder users.`);

  const movies = await db.movie.findMany({ select: { id: true, movieId: true } });
  const movieIdMap = new Map(movies.map(m => [m.movieId, m.id]));

  // 2️⃣ Prepare movie votes
  const votesToCreate = records.map(row => ({
    movieId: movieIdMap.get(Number(row.movieId)),
    vote: Number(row.vote),
    createdById: row.createdById,
    createdAt: row.createdAt ? new Date(row.createdAt) : undefined,
  }));

  // Bulk create all votes
  const createdVotes = await db.movieVote.createMany({
    data: votesToCreate,
    skipDuplicates: true, // avoids errors for unique constraints
  });

  console.log(`Inserted ${createdVotes.count} votes.`);
};

fillVotes().catch(err => console.error(err));
