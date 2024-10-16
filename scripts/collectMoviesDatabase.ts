import { db } from "~/server/db";
import * as fs from "fs";
import * as path from "path";
import { type Movie } from "@prisma/client";


const exportToCsv = (filename: string, rows: Array<Movie>, headers?: string[]): void => {
    if (!rows?.length) {
        return;
    }
    const separator = ",";

    const keys: (keyof Movie)[] = Object.keys(rows[0] ?? {}) as (keyof Movie)[];

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
                    case 'title':
                    case 'original_title':
                    case 'genre':
                    case 'genres':
                    case 'original_language':
                    case 'poster_path':
                    case 'overview':
                    case 'cast':
                    case 'direct':
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


const collectMovies = async () => {
    const Movies = await db.movie.findMany();

    // console.log(votes)
    exportToCsv('./Movies.csv', Movies);
}

await collectMovies()
