import './App.css'
import {DragDropContext, Droppable, Draggable, DropResult} from 'react-beautiful-dnd';
import {ReactNode, useState} from "react";
import {cards, PlayingCardData} from "@/lib/sample-data/cardData.ts";
import PlayingCard from "@/components/PlayingCard.tsx";

function App(): ReactNode {
    const [playingCards, setPlayingCards] = useState<PlayingCardData[]>(cards);
    const [chosenCard, setChosenCard] = useState<PlayingCardData | null>(null);
    const topCard = playingCards[0];
    const handleDragDrop = (results: DropResult) => {
        console.log(results)
        const {source, destination} = results;

        // If nothing changes
        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }
        if (playingCards.length === 1) return;

        // If a card is dragged from the "DECK" to the "SPOT"
        if (source.droppableId === "DECK" && destination.droppableId === "SPOT") {
            setChosenCard(topCard);
            setPlayingCards(prevCards => prevCards.slice(1));
        }

        // If a card is dragged out of the "SPOT" and back to the "DECK"
        if (source.droppableId === "SPOT" && destination.droppableId === "DECK") {
            if (chosenCard) {
                setPlayingCards(prevCards => [chosenCard, ...prevCards]);
                setChosenCard(null);
            }
        }

    }

    return (
        <>
            <DragDropContext
                onDragEnd={handleDragDrop}
            >
                <div className={"text-2xl"}>
                    Card Deck
                </div>
                <div className={"flex gap-10"}>


                    {/*DECL*/}
                    <Droppable

                        droppableId="DECK"
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
                                            className={""}
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
                    {/*    SPOT*/}

                    <div>
                        <Droppable droppableId={"SPOT"}>
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className={`border-2 border-dashed w-custom-card h-custom-card`}
                                >
                                    {chosenCard && <PlayingCard text={chosenCard.text}/>}
                                    {provided.placeholder}

                                </div>
                            )}
                        </Droppable>
                    </div>
                </div>

            </DragDropContext>

        </>

    )
}

export default App
