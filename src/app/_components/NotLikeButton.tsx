"use client";

import { CircleX } from "lucide-react";
import CircularButton from "./circularButton";

export default function NotLikeButton({ callBack }: { callBack: () => void }) {
  function voteMovie(liked: boolean): void {
    callBack();
  }

  return (
    <CircularButton
      icon={<CircleX className="h-6 w-6" />}
      label="Not Like"
      onClick={() => voteMovie(false)}
    />
  );
}
