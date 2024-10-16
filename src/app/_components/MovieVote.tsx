"use client";

import Image from "next/image";
import { api } from "~/trpc/react";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Button } from "~/components/ui/button";
import { MAX_LENGTH_TITLE_MOB, MAX_RATING } from "~/utils/constant";

export default function MovieVote() {
  const [randomMovie] = api.movie.getRandomMovie.useSuspenseQuery();
  const [isLoading, setIsLoading] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const starArr = Array.from({ length: MAX_RATING });

  const utils = api.useUtils();
  const createVote = api.movieVote.movie_vote.useMutation({
    onSuccess: async () => {
      await utils.movie.invalidate();
    },
  });

  useEffect(() => {
    setIsLoading(false)
    setRating(0);
    setHoveredRating(0)
  }, [randomMovie]);

  const voteMovie = (vote: number) => {
    if (isLoading) return;
    setIsLoading(true)
    if (randomMovie) {
      createVote.mutate({ movieId: randomMovie?.id, vote: vote });
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {randomMovie && !isLoading && (
        <div className="flex flex-col items-center justify-center">
          {randomMovie && (
            <div className="flex flex-col items-center justify-center rounded-md shadow-lg">
              <Image
                unoptimized
                src={`https://image.tmdb.org/t/p/w300${randomMovie.poster_path}`}
                alt="Poster"
                width={300}
                height={450}
                className="rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>
      )}
      {isLoading && (
        <div className="w-[300px] h-[450px] flex items-center justify-center">
          <Image src={`/rings.svg`} width={300} height={450} alt="Loading" />
        </div>
      )}
      {randomMovie == null && (
        <p className="w-2/3 py-5 text-center text-xl">
          There is no more movies to vote.
        </p>
      )}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col justify-center space-x-1">
          {/* text-muted-foreground */}
          <p className="mb-2 text-center text-sm">
            Rate {randomMovie?.title && randomMovie.title.length > MAX_LENGTH_TITLE_MOB ?
              randomMovie?.title.substring(0, MAX_LENGTH_TITLE_MOB) + "..." :
              randomMovie?.title}:
          </p>
          <div className="flex flex-row justify-center">

            {starArr.map((_, index) => (
              <Star
                key={index}
                className={`h-8 w-8 cursor-pointer ${index < (hoveredRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                onClick={() => {
                  setRating(index + 1)
                  voteMovie(index + 1)
                }}
                onMouseEnter={() => setHoveredRating(index + 1)}
                onMouseLeave={() => setHoveredRating(0)}
                aria-disabled={isLoading}
              />
            ))}
          </div>
          <p className="mt-2 text-center text-lg font-semibold">{rating} / {MAX_RATING}</p>
        </div>
        <div className="flex">
          <Button
            // variant="outline"
            className="flex-1"
            onClick={() => voteMovie(0)}
            disabled={isLoading}
          >
            Skip
          </Button>
        </div>
      </div>
    </div>
  );
}
