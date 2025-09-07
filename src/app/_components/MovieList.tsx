"use client";

import { api } from "~/trpc/react";
import MovieCard from "./MovieCard";

export default function MovieList() {
    const [movies] = api.movieVote.get_votes_user.useSuspenseQuery();
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 hover:cursor-pointer max-w-6xl mx-auto ">
            {movies && (
                <>
                    {movies?.map((movie, index) => (
                        <MovieCard movie={movie} key={index} />
                    ))}
                </>

            )}
            {movies == null || movies.length == 0 && (
                <p className="w-2/3 py-5 text-center text-xl">
                    There is no ratings to show.
                </p>
            )}
        </div >
    );
}
