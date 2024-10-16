'use client'
import { type Movie, type MovieVote } from '@prisma/client';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { api } from '~/trpc/react';
import { MAX_LENGTH_TITLE_MOB, MAX_RATING } from '~/utils/constant';
import { Badge } from "~/components/ui/badge"

type MovieVoteList = MovieVote & { movie: Movie }

function MovieCard({ movie }: { movie: MovieVoteList }) {
    const [rating, setRating] = useState(movie.vote)
    const [hoveredRating, setHoveredRating] = useState(0)
    const starArr = Array.from({ length: MAX_RATING });
    const mutationVote = api.movieVote.update_movie_vote.useMutation({
        onSuccess: async () => {
            await api.useUtils().movieVote.invalidate();
        },
    });

    const updateVote = (vote: number) => {
        mutationVote.mutate({ id: movie.id, vote: vote })
        setRating(vote);
    }

    return (
        <div className="relative flex p-4 bg-white rounded-lg shadow-md w-full h-full mb-4 gap-2">
            {rating < 1 && (
                <div className="absolute top-0 right-0 -mt-2 z-10">
                    <Badge variant="destructive" className="text-xs px-4 py-1">
                        Skipped
                    </Badge>
                </div>
            )}
            <div className='w-24 h-full absolute left-0 top-0'>
                <Image
                    unoptimized
                    src={`https://image.tmdb.org/t/p/w200${movie.movie.poster_path}`}
                    alt="Poster"
                    width={100}
                    height={100}
                    className="rounded-lg rounded-r-none shadow-lg w-full h-full object-cover"
                />
            </div>
            <div className="flex flex-col flex-1 h-full justify-evenly items-center gap-3 ml-20">
                <h3 className="flex-1 text-lg font-semibold text-slate-950">
                    {movie.movie.title.length > MAX_LENGTH_TITLE_MOB ? movie.movie.title.substring(0, MAX_LENGTH_TITLE_MOB) + '...' : movie.movie.title}
                </h3>
                <div className="flex flex-row justify-center">
                    {starArr.map((_, index) => (
                        <Star
                            key={index}
                            className={`h-8 w-8 cursor-pointer ${index < (hoveredRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                            onClick={() => {
                                setRating(index + 1)
                                updateVote(index + 1)
                            }}
                            onMouseEnter={() => setHoveredRating(index + 1)}
                            onMouseLeave={() => setHoveredRating(0)}
                        />
                    ))}
                </div>
            </div>
        </div>);
}

export default MovieCard;