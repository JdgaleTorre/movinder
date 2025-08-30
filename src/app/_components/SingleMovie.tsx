"use client"
import React from "react";
import Image from "next/image";

import { api } from "~/trpc/react";
import { Repeat } from "lucide-react";

type SingleMoviePageProps = {
    id: number;
};

const SingleMoviePage: React.FC<SingleMoviePageProps> = ({ id }) => {
    const [movie] = api.movie.getMovie.useSuspenseQuery(id);

    if (!movie) return <div>Loading...</div>;

    const votePercent = Math.round((Number(movie?.vote_average) / 10) * 100);

    return (
        <div className="">
            {/* Backdrop Header
            <div
                className="relative h-[400px] w-full bg-cover bg-center"
                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie?.backdrop_path})` }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
                    <div className="p-6">
                        <h1 className="text-4xl font-bold">{movie?.title}</h1>
                        <p className="text-sm text-gray-300">{movie?.release_date}</p>
                    </div>
                </div>
            </div> */}

            {/* Main Content */}
            <div className="w-full mx-auto p-6" style={{
                backgroundImage: ` linear-gradient(
  to right,
  rgba(255, 255, 255, 0.05) calc((50vw - 170px) - 340px), /* barely visible left edge */
  rgba(255, 255, 255, 1) 50%,                             /* fully opaque center */
  rgba(255, 255, 255, 0.05) 100%                           /* barely visible right edge */
),
                url(https://image.tmdb.org/t/p/w500${movie?.backdrop_path})`, backgroundSize: "cover", backgroundRepeat: "no-repeat"
            }}>
                <div className="max-w-6xl mx-auto  grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Poster */}
                    <div className="flex justify-center items-center">
                        <Image
                            unoptimized
                            src={movie?.poster_path ? `https://image.tmdb.org/t/p/w500${movie?.poster_path}` : "/fallback.jpg"}
                            alt={movie?.title ?? "Poster"}
                            className="rounded-lg shadow-lg h-[450px] object-cover"
                            width={300}
                            height={450}
                        />
                    </div>

                    {/* Details */}
                    <div className="md:col-span-2 space-y-4">
                        <h2 className="text-3xl font-bold">{movie?.original_title}</h2>
                        <p className="text-gray-400 text-sm">
                            {movie?.genres} | {movie?.original_language.toUpperCase()}
                        </p>
                        <p className="leading-relaxed">{movie?.overview}</p>

                        <div className="flex items-center space-x-4">
                            <div className="relative w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center font-bold text-lg">
                                {votePercent}%
                            </div>
                            <span className="text-gray-300">{movie?.vote_count} votes</span>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mt-4">Directed by</h3>
                            <p>{movie?.direct}</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mt-4">Cast</h3>
                            <p>{movie?.cast}</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default SingleMoviePage;
