"use client"
import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";

import { api } from "~/trpc/react";
import VoteCircle from "./VoteCircle";
import { useRouter } from "next/navigation";
import { MAX_RATING } from '~/utils/constant';
import { Star } from "lucide-react";
import { useSession } from "next-auth/react";
import { type MovieVote } from "@prisma/client";


type SingleMoviePageProps = {
    id: number;
};

const SingleMoviePage: React.FC<SingleMoviePageProps> = ({ id }) => {
    const [movie] = api.movie.getMovie.useSuspenseQuery(id);
    const [similarMovies] = api.movie.getSimilarMovies.useSuspenseQuery(id);
    const router = useRouter();
    const starArr = Array.from({ length: MAX_RATING });
    const [rating, setRating] = useState(0)
    const [hoveredRating, setHoveredRating] = useState(0)
    const { data: session, status } = useSession();

    useEffect(() => {
        window.scrollTo(0, 0);
        if (movie && movie.MovieVote && movie.MovieVote.length > 0) {
            const { vote } = movie.MovieVote[0]!;
            setRating(vote);
        } else {
            setRating(0);
        }
    }, [movie]);


    const mutationVote = api.movieVote.update_movie_vote.useMutation({
        onSuccess: async () => {
            await api.useUtils().movieVote.invalidate();
        },
    });

    const updateVote = (vote: number) => {
        if (!movie) return;
        mutationVote.mutate({ id: movie.id, vote: vote })
        setRating(vote);
    }

    // if (!movie) return <div className="h-full w-full flex justify-center align-middle">
    //     <Image src={`/rings.svg`} width={300} height={450} alt="Loading" />
    // </div>;

    // const votePercent = Math.round((Number(movie?.vote_average) / 10) * 100);

    return (
        <div className="">
            <Suspense fallback={<Image src={`/rings.svg`} width={300} height={450} alt="Loading" />}>

                <div className="container mx-auto px-4 py-6">
                    <div className="max-w-sm md:max-w-6xl mx-auto  grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Poster */}
                        <div className="flex flex-col justify-center items-center">
                            <Image
                                unoptimized
                                src={movie?.poster_path ? `https://image.tmdb.org/t/p/w500${movie?.poster_path}` : "/fallback.jpg"}
                                alt={movie?.title ?? "Poster"}
                                className="rounded-lg shadow-lg h-[450px] object-cover mb-5"
                                width={300}
                                height={450}
                            />
                            {status == 'authenticated' && movie && (
                                <div className="flex flex-row justify-center">
                                    {starArr.map((_, index) => (
                                        <Star
                                            key={index}
                                            className={`h-8 w-8 cursor-pointer ${index < (hoveredRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                            onClick={() => {
                                                setRating(index + 1)
                                                updateVote(index + 1)
                                            }}
                                            onMouseEnter={() => setHoveredRating(index + 1)}
                                            onMouseLeave={() => setHoveredRating(0)}
                                        />
                                    ))}
                                </div>
                            )}
                            {status == 'unauthenticated' && movie && (
                                <div className="flex flex-row justify-center">
                                    <p className="text-gray-600 italic"><a href="/api/auth/signin" className="text-blue-800">Log in</a> to rate this movie</p>
                                </div>
                            )}
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
                {similarMovies && similarMovies.length > 0 && (
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
                )}
            </Suspense>
        </div>
    );
};

export default SingleMoviePage;
