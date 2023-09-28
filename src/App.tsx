import './App.css'
import {DragDropContext, Droppable, Draggable, DropResult} from 'react-beautiful-dnd';
import {ReactNode, useState} from "react";
import {cards, PlayingCardData} from "@/lib/sample-data/cardData.ts";
import PlayingCard from "@/components/PlayingCard.tsx";

function App(): ReactNode {
    const [playingCards, setPlayingCards] = useState<PlayingCardData[]>(cards);
    const handleDragDrop = (results: DropResult) => {
        const {source, destination} = results;

        // If nothing changes
        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }

        // otherwise, update state
        const reorderedCards: PlayingCardData[] = [...playingCards];

        const sourceIndex = source.index;
        const [removedCard] = reorderedCards.splice(sourceIndex, 1);
        const destinationIndex = destination.index;
        reorderedCards.splice(destinationIndex, 0, removedCard);
        return setPlayingCards(reorderedCards);

    }
    const topCard = playingCards[0];
    return (
        <>
            <DragDropContext
                onDragEnd={handleDragDrop}
            >

                <div className={"text-2xl"}>
                    Card Deck
                </div>

                <Droppable
                    droppableId="DECK"
                    type={"stack"}
                >
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >

                                <Draggable
                                    draggableId={topCard.id}
                                    key={topCard.id}
                                    index={0}
                                >
                                    {(provided) => (
                                        <div
                                            className={"p-2"}
                                            {...provided.dragHandleProps}
                                            {...provided.draggableProps}
                                            ref={provided.innerRef}
                                        >
                                            <PlayingCard
                                                text={topCard.text}
                                            />

                                        </div>
                                    )}
                                </Draggable>

                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>

            </DragDropContext>

        </>

    )
}

export default App
