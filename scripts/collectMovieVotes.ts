import { db } from "~/server/db";
import * as fs from "fs";
import * as path from "path";

type tempMovieVote = {
    movieId: number,
    movieTitle: string,
    createdById: string,
    createdAt: Date,
    vote: number
}


const exportToCsv = (filename: string, rows: Array<tempMovieVote>, headers?: string[]): void => {
    if (!rows?.length) {
        return;
    }
    const separator = ",";

    const keys: (keyof tempMovieVote)[] = Object.keys(rows[0] ?? {}) as (keyof tempMovieVote)[];

    let columHearders: string[];

    if (headers) {
        columHearders = headers;
    } else {
        columHearders = keys as string[];
    }

    const csvContent =
        columHearders.join(separator) +
        '\n' +
        rows.map(row => {
            return keys.map(k => {
                switch (k) {
                    case 'createdAt':
                        return row[k].toISOString().replace('T', '').replace('Z', '');
                    case 'movieTitle':
                        const title = row[k].toString().replace(/"/g, '""');
                        if (title.search(',') > 0) return `"${title}"`;
                        return title;
                    default:
                        return row[k].toString().replace(/"/g, '""');
                }
            }).join(separator);
        }).join('\n');

    const csvFilePath = path.resolve(filename);
    fs.writeFile(csvFilePath, csvContent, 'utf8', (err: NodeJS.ErrnoException | null) => {
        if (err) {
            console.log(err);
        }
    });
}


const collectVotes = async () => {
    const MovieVotes = await db.movieVote.findMany({
        include: { movie: true }
    });

    const votes = new Array<tempMovieVote>();
    //loop through movie votes and create a new array with the movieId, createdById, createdAt and vote value
    for (const movieVote of MovieVotes) {
        const vote = {
            movieId: movieVote.movie.movieId,
            movieTitle: movieVote.movie.title,
            createdById: movieVote.createdById,
            createdAt: movieVote.createdAt,
            vote: movieVote.vote
        }
        votes.push(vote)
    }

    // console.log(votes)
    exportToCsv('./MoviesVotes.csv', votes);
}

await collectVotes()
