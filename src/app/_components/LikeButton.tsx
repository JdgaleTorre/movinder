"use client";

import { ThumbsUp } from "lucide-react";
import CircularButton from "./circularButton";

export default function LikeButton({ callBack }: { callBack: () => void }) {
  function voteMovie(liked: boolean): void {
    callBack();
  }

  return (
    <CircularButton
      icon={<ThumbsUp className="h-6 w-6" />}
      label="Like"
      onClick={() => voteMovie(true)}
    />
  );
}
