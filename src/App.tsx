import './App.css'
import {DragDropContext, Droppable, DropResult} from 'react-beautiful-dnd';
import {ReactNode, useState} from "react";
import {cards, PlayingCardData} from "@/lib/sample-data/cardData.ts";
import Deck from "@/components/Deck.tsx";
import ViewingArea from "@/components/ViewingArea.tsx";

function App(): ReactNode {
    const [playingCards, setPlayingCards] = useState<PlayingCardData[]>(cards);
    const [draggingCard, setDraggingCard] = useState<PlayingCardData | null>(null);
    const topCard = playingCards[0];
    const secondCard = playingCards[1];

    const [isDragging, setIsDragging] = useState<boolean>(false);

    const handleDragStart = () => {
        setIsDragging(true);
    };


    // IDs
    const viewingArea: string = "VIEWING AREA";

    // FUNCTIONS
    const handleDragDrop = (results: DropResult) => {
        setIsDragging(false);
        const {source, destination} = results;

        // If nothing changes
        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }
        if (playingCards.length === 1) return;

        // If a card is dragged from the "DECK" to the "SPOT"
        if (source.droppableId === "DECK" && destination.droppableId === viewingArea) {
            setDraggingCard(topCard);
            setPlayingCards(prevCards => prevCards.slice(1));
        }

        // If a card is dragged out of the "SPOT" and back to the "DECK"
        if (source.droppableId === viewingArea && destination.droppableId === "DECK") {
            if (draggingCard) {
                setPlayingCards(prevCards => [draggingCard, ...prevCards]);
                setDraggingCard(null);
            }
        }

    }

    return (
        <>
            <DragDropContext
                onDragEnd={handleDragDrop}
                onDragStart={handleDragStart}
            >
                <div className={"text-2xl"}>
                    Card Deck
                </div>
                <div className={"flex gap-10"}>

                    {/*DECK*/}
                    <Droppable
                        droppableId="DECK"
                    >
                        {(provided) => (
                            <Deck
                                topCard={topCard}
                                secondCard={secondCard}
                                isDragging={isDragging}
                                provided={provided}
                            />
                        )}
                    </Droppable>


                    {/*    VIEWING AREA*/}
                    <div>
                        <Droppable droppableId={viewingArea}>
                            {(provided) => (
                                <ViewingArea draggingCard={draggingCard} provided={provided}/>
                            )}
                        </Droppable>
                    </div>
                </div>

            </DragDropContext>

        </>

    )
}

export default App
