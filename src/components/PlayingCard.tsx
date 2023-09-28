interface PlayingCardProps {
    text: string;
}

export default function PlayingCard({text}: PlayingCardProps) {

    return (

        <div
            className={"bg-gray-200 p-4 rounded-lg card-shadow w-[212px] h-[302px] transition-transform duration-300 transform hover:-translate-y-2 border-amber-950 border-2"}>

            <div className={"flex justify-center text-2xl font-semibold"}>
                {text}
            </div>

        </div>
    );
}