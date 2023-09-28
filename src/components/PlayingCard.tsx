import {cardDimensions} from "@/lib/dimensions";

interface PlayingCardProps {
    text: string;
}

export default function PlayingCard({text}: PlayingCardProps) {

    return (

        <div
            className={`w-[${cardDimensions.width}] h-[${cardDimensions.height}] bg-gray-200 p-4 rounded-lg card-shadow border-amber-950 border-2`}>

            <div className={"flex justify-center text-2xl font-semibold"}>
                {text}
            </div>

        </div>
    );
}