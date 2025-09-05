"use client"
import React, { Suspense, useEffect } from "react";
import Image from "next/image";

import { api } from "~/trpc/react";
import VoteCircle from "./VoteCircle";
import { useRouter } from "next/navigation";

type SingleMoviePageProps = {
    id: number;
};

const SingleMoviePage: React.FC<SingleMoviePageProps> = ({ id }) => {
    const [movie] = api.movie.getMovie.useSuspenseQuery(id);
    const [similarMovies] = api.movie.getSimilarMovies.useSuspenseQuery(id);
    const router = useRouter();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    // if (!movie) return <div className="h-full w-full flex justify-center align-middle">
    //     <Image src={`/rings.svg`} width={300} height={450} alt="Loading" />
    // </div>;

    // const votePercent = Math.round((Number(movie?.vote_average) / 10) * 100);

    return (
        <div className="">
            <Suspense fallback={<Image src={`/rings.svg`} width={300} height={450} alt="Loading" />}>

                <div className="container mx-auto px-4 py-6">
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
                            <p className="text-gray-600 text-sm">
                                {movie?.genres} | {movie?.original_language.toUpperCase()}
                            </p>
                            <p className="leading-relaxed">{movie?.overview}</p>

                            <div className="flex items-center space-x-4">
                                {movie && <VoteCircle vote={movie.vote_average} />}
                                <span className="text-gray-600">{movie?.vote_count} votes</span>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mt-4">Directed by</h3>
                                <p>{movie?.direct.replace("-", " ")}</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mt-4">Cast</h3>
                                {movie?.cast.split(" ").slice(0, 10).map(name => (<p key={name}>{name.trim().replace("-", " ")}</p>))}
                            </div>
                        </div>

                    </div>
                </div>
                <div className="container mx-auto px-4 py-6">
                    <div className="md:max-w-6xl mx-auto max-w-sm">

                        <h3 className="text-xl font-semibold">Similar Movies</h3>

                        <div className="scrollbar-hidden overflow-x-auto overflow-visible">

                            <div className="flex flex-nowrap space-x-4 rounded-lg mb-4 mt-5">
                                {similarMovies?.map(movie => (
                                    <div key={movie.id} className="flex-shrink-0 w-[250px] rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer hover:scale-105 "
                                        onClick={() => {
                                            router.push(`/movie/${movie.movieId}`)
                                        }}>
                                        <Image
                                            unoptimized
                                            src={movie.poster_path ? `https://image.tmdb.org/t/p/w250_and_h141_face${movie.poster_path}` : "/fallback.jpg"}
                                            alt={movie.title ?? "Poster"}
                                            className="w-full h-[141px] object-cover rounded-t-lg "
                                            width={350}
                                            height={100}
                                        />
                                        <div className="p-4">
                                            <h4 className="font-semibold">{movie.title}</h4>
                                            <p className="text-sm text-gray-600">{movie.release_date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </Suspense>
        </div>
    );
};

export default SingleMoviePage;
