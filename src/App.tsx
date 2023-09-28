import './App.css'
import {DragDropContext, DragStart, Droppable, DropResult} from 'react-beautiful-dnd';
import {ReactNode, useState} from "react";
import {cards, PlayingCardData} from "@/lib/sample-data/cardData.ts";
import Deck from "@/components/Deck.tsx";
import ViewingArea from "@/components/ViewingArea.tsx";

function App(): ReactNode {
    const [playingCards, setPlayingCards] = useState<PlayingCardData[]>(cards);
    const [draggingCard, setDraggingCard] = useState<PlayingCardData | null>(null);
    const [viewingAreaCards, setViewingAreaCards] = useState<PlayingCardData[]>([]);
    const topCard = playingCards[0];
    const secondCard = playingCards[1];

    const [isDragging, setIsDragging] = useState<boolean>(false);

    const handleDragStart = (start: DragStart) => {
        if (start.source.droppableId === "DECK") {
        setIsDragging(true);
    }
    };


    // IDs
    const viewingAreaId: string = "VIEWING AREA";

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

        // If a card is dragged from the "DECK" to the "VIEWING AREA"
        if (source.droppableId === "DECK" && destination.droppableId === viewingAreaId) {
            setDraggingCard(topCard);
            setViewingAreaCards(prevCards => [...prevCards, topCard]);
            setPlayingCards(prevCards => prevCards.slice(1));
        }

        // If a card is dragged out of the "SPOT" and back to the "DECK"
        if (source.droppableId === viewingAreaId && destination.droppableId === "DECK") {
            if (draggingCard) {
                setPlayingCards(prevCards => [draggingCard, ...prevCards]);
                setDraggingCard(null);
            }
        }

        if (source.droppableId === viewingAreaId && destination.droppableId === viewingAreaId) {
            const reorderedCards = Array.from(viewingAreaCards);
            const [movedCard] = reorderedCards.splice(source.index, 1);
            reorderedCards.splice(destination.index, 0, movedCard);
            setViewingAreaCards(reorderedCards);
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
                    <div className="p-2">

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

                    </div>
                    {/*    VIEWING AREA*/}
                    <div
                        className={"p-2"}
                    >
                        <Droppable
                            droppableId={viewingAreaId}
                            // type={"list"}
                            direction={"horizontal"}
                        >
                            {(provided) => (
                                <ViewingArea
                                    viewingAreaCards={viewingAreaCards}
                                    provided={provided}/>
                            )}
                        </Droppable>
                    </div>
                </div>

            </DragDropContext>

        </>

    )
}

export default App
