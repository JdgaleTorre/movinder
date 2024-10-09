"use client";

import { EyeOff } from "lucide-react";
import CircularButton from "./circularButton";

export default function NotSeenMovie({ callBack }: { callBack: () => void }) {
  function notSeenMovie(): void {
    callBack();
  }

  return (
    <CircularButton
      icon={<EyeOff className="h-6 w-6" />}
      label="Not Seen"
      onClick={() => notSeenMovie()}
    />
  );
}
