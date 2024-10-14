"use client";

import Image from "next/image";
import { api } from "~/trpc/react";
import { useEffect, useState } from "react";
import CircularButton from "./circularButton";
import { CircleX, EyeOff, ThumbsUp } from "lucide-react";

export default function MovieVote() {
  const [randomMovie] = api.movie.getRandomMovie.useSuspenseQuery();
  const [isLoading, setIsLoading] = useState(false)
  const utils = api.useUtils();
  const createVote = api.movieVote.movie_vote.useMutation({
    onSuccess: async () => {
      await utils.movie.invalidate();
    },
  });

  // const refreshMovie = async () => {
  //   randomMovie = await api.movie.getRandomMovie();
  // };

  useEffect(() => {
    setIsLoading(false)
  }, [randomMovie]);

  async function voteMovie(liked: boolean): Promise<void> {
    setIsLoading(true)
    if (randomMovie) {
      createVote.mutate({ movieId: randomMovie?.id, vote: liked ? 1 : 0 });
    }
  }

  function notSeenMovie(): void {
    setIsLoading(true)
    if (randomMovie) {
      createVote.mutate({ movieId: randomMovie?.id, vote: -1 });
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      {randomMovie && !isLoading && (
        <div className="flex flex-col items-center justify-center">
          {randomMovie && (
            <div className="flex flex-col items-center justify-center">
              <Image
                src={`https://image.tmdb.org/t/p/w300${randomMovie.poster_path}`}
                alt="Poster"
                width={300}
                height={450}
              />
              <div className="text-2xl sm:text-[5rem]">{randomMovie.title}</div>
            </div>
          )}
        </div>
      )}
      {isLoading && (
        <Image src={`/rings.svg`} width={300} height={450} alt="Loading" />
        // <img src="/rings.svg" className="w-[400px] h-[632px] min-w-[400px] max-w-screen-md" />

      )}
      <div className="flex gap-20">
        <CircularButton onClick={() => voteMovie(false)} icon={<CircleX className="h-6 w-6" />}
          label="Not Like" disabled={isLoading} />
        <CircularButton onClick={notSeenMovie} icon={<EyeOff className="h-6 w-6" />}
          label="Not Seen" disabled={isLoading} />
        <CircularButton onClick={() => voteMovie(true)} icon={<ThumbsUp className="h-6 w-6" />}
          label="Not Like" disabled={isLoading} />
      </div>
    </div>
  );
}
