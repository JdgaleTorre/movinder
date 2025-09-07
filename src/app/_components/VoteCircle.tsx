import { type Decimal } from "@prisma/client/runtime/library";

export default function VoteCircle({ vote }: { vote: Decimal }) {
    const radius = 28;
    const stroke = 3;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const percent = Math.round((Number(vote) * 100) / 5);
    const strokeDashoffset = circumference - (percent / 100) * circumference;

    return (
        <svg
            height={radius * 2}
            width={radius * 2}
            className="bg-gray-800 rounded-full"
        >
            {/* Background circle */}
            <circle
                stroke="gray"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
            {/* Progress circle */}
            <circle
                stroke={percent >= 70 ? "limegreen" : percent >= 40 ? "gold" : "red"}
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={circumference + " " + circumference}
                style={{ strokeDashoffset }}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
            {/* Text in center */}
            <text
                x="50%"
                y="50%"
                dy=".3em"
                textAnchor="middle"
                fontSize="10"
                fill="white"
            >
                {percent}%
            </text>
        </svg>
    );
}