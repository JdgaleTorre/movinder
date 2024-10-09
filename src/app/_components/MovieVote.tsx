"use client";

import Image from "next/image";
import NotLikeButton from "./NotLikeButton";
import NotSeenMovie from "./NotSeen";
import LikeButton from "./LikeButton";
import { api } from "~/trpc/react";
import { Movie } from "@prisma/client";

export default async function MovieVote() {
  let { data: randomMovie } = api.movie.getRandomMovie.useQuery();
  const utils = api.useUtils();
  const createVote = api.movieVote.movie_vote.useMutation({
    onSuccess: async () => {
      await utils.movie.invalidate();
    },
  });

  // const refreshMovie = async () => {
  //   randomMovie = await api.movie.getRandomMovie();
  // };

  async function voteMovie(liked: boolean): Promise<void> {
    if (randomMovie) {
      createVote.mutate({ movieId: randomMovie?.id, vote: liked ? 1 : 0 });
    }
  }

  function notSeenMovie(): void {
    if (randomMovie) {
      createVote.mutate({ movieId: randomMovie?.id, vote: -1 });
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {randomMovie ? (
        <>
          <div className="flex flex-col items-center justify-center">
            {randomMovie && (
              <div className="flex flex-col items-center justify-center">
                <Image
                  src={`https://image.tmdb.org/t/p/w400${randomMovie.poster_path}`}
                  alt="Poster"
                  width={400}
                  height={600}
                />
                <div className="text-2xl">{randomMovie.title}</div>
              </div>
            )}
          </div>
          <div className="flex gap-20">
            <NotLikeButton callBack={() => voteMovie(false)} />
            <NotSeenMovie callBack={notSeenMovie} />
            <LikeButton callBack={() => voteMovie(true)} />
          </div>
        </>
      ) : (
        <p>You have no posts yet.</p>
      )}
    </div>
  );
}
