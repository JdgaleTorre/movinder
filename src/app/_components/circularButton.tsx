'use client';
import { Button } from "~/components/ui/button";
import { Home } from "lucide-react";

interface CircleIconButtonProps {
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function CircularButton({
  icon = <Home className="h-6 w-6" />,
  label = "Home",
  onClick,
  disabled= false,
}: CircleIconButtonProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-16 w-16 rounded-full bg-gray-950"
        onClick={onClick}
        aria-label={label}
        disabled={disabled}
      >
        {icon}
      </Button>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
