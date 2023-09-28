
interface PlayingCardProps {
    isDragging: boolean;
    text: string;
}

export default function PlayingCard({ isDragging, text }: PlayingCardProps) {


    return (
        <>
            {isDragging && "👆"}
            {text}
        </>
    );
}
