import {PlayingCardData} from "@/lib/sample-data/cardData.ts";
import {Draggable, DroppableProvided} from "react-beautiful-dnd";
import PlayingCard from "@/components/PlayingCard.tsx";

interface DeckProps {
    topCard: PlayingCardData;
    secondCard: PlayingCardData;
    isDragging: boolean;
    provided: DroppableProvided;
}

export default function Deck({topCard, secondCard, isDragging, provided}: DeckProps) {
    return (
              <div {...provided.droppableProps} ref={provided.innerRef}>
            {isDragging && <PlayingCard text={secondCard.text} />}
            <Draggable draggableId={topCard.id} key={topCard.id} index={0}>
                {(provided) => (
                    <div
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                    >
                        <PlayingCard text={topCard.text} />
                    </div>
                )}
            </Draggable>
            {provided.placeholder}
        </div>
    )
}