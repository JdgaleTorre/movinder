"use client"
import { api } from "~/trpc/react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import VoteCircle from "./VoteCircle";

export default function SearchMovieList({input}: {input: string}) {

    const [searchResults] = api.movie.searchMovies.useSuspenseQuery(decodeURIComponent(input));
    const router = useRouter();
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 hover:cursor-pointer max-w-6xl mx-auto ">
            {searchResults?.map(movie => (
                <div
                    key={movie.id}
                    className="relative bg-white dark:bg-gray-800 rounded-xl shadow-md  hover:shadow-lg transition duration-300 transform hover:scale-105 pt-4"
                    onClick={() => {
                        // Handle movie click
                        router.push(`/movie/${movie.movieId}`)
                    }}
                >
                    {/* Poster */}
                    <Image
                        unoptimized
                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/fallback.jpg"}
                        alt={movie.title}
                        className="object-cover rounded-t-xl mx-auto"
                        width={300}
                        height={500}
                    />

                    {/* Content */}
                    <div className=" p-4 flex flex-col space-y-2">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                            {movie.title}
                        </h3>
                        {/* Circular Vote Average Badge */}
                        <div className="absolute top-3 left-3">
                            <VoteCircle vote={movie.vote_average} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}