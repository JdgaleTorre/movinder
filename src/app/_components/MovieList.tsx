"use client";

import { api } from "~/trpc/react";
import MovieCard from "./MovieCard";

export default function MovieList() {
    const [movies] = api.movieVote.get_votes_user.useSuspenseQuery();
    return (
        <div className="flex flex-col items-center justify-center gap-2 mt-12">
            {movies && (
                <div className="flex flex-col items-center justify-center w-full max-w-md">
                    {movies?.map((movie, index) => (
                        <MovieCard movie={movie} key={index} />
                    ))
                    }
                </div>
            )}
            {movies == null && (
                <p className="w-2/3 py-5 text-center text-xl">
                    There is no votes.
                </p>
            )}
        </div >
    );
}
