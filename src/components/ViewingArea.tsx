import {PlayingCardData} from "@/lib/sample-data/cardData.ts";
import {Draggable, DroppableProvided} from "react-beautiful-dnd";
import PlayingCard from "@/components/PlayingCard.tsx";

interface ViewingAreaProps {
    viewingAreaCards: PlayingCardData[];
    provided: DroppableProvided;
}

export default function ViewingArea({viewingAreaCards, provided}: ViewingAreaProps) {
    return (
        <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`border-2 border-dashed w-[636px]  h-custom-card bg-gray-200 rounded-lg flex`}
        >
            {viewingAreaCards.map((card, index) => (
                <Draggable key={card.id} draggableId={card.id} index={index}
                >
                    {(provided) => (
                        <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className={"pr-1"}
                        >
                            <PlayingCard text={card.text}/>



                        </div>
                    )}
                </Draggable>
            ))}
            {provided.placeholder}
        </div>
    )
}