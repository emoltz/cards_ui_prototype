import {PlayingCardData} from "@/lib/sample-data/cardData.ts";
import {DroppableProvided} from "react-beautiful-dnd";
import PlayingCard from "@/components/PlayingCard.tsx";

interface ViewingAreaProps {
    draggingCard: PlayingCardData | null;
    provided: DroppableProvided;
}

export default function ViewingArea({draggingCard, provided}: ViewingAreaProps) {
    return (
        <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`border-2 border-dashed w-custom-card h-custom-card`}
        >
            {draggingCard && <PlayingCard text={draggingCard.text}/>}
            {provided.placeholder}
        </div>
    )
}