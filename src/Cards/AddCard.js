import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import NavBar from "../Layout/NavBar";
import CardForm from "./CardForm";

function AddCard() {
  // State hook for current deck 
  const [currentDeck, setCurrentDeck] = useState({});
  const { deckId } = useParams();
  

  useEffect(() => {
    // abort controller created
    const abortCon = new AbortController();
    async function getDeck() {
      try {
        // check if deckId exists
        if (deckId) {
          const haveDeck = await readDeck(deckId, abortCon.signal);
          // update the currentDeck with the data from haveDeck
          setCurrentDeck({ ...haveDeck });
        }
        // throws error if there is one 
      } catch (error) {
        throw error;
      }
    }
    // cals getDeck fucntion 
    getDeck();
    // returns a cleanup function 
    return () => abortCon.abort();
  }, [deckId]);

  return (
    <>
      <div className="d-flex">
        <NavBar
          linkName={currentDeck.name}
          link={`/decks/${currentDeck.id}`}
          pageName="Add Card"
        />
      </div>
      <div className="d-flex flex-column">
        <h2>{currentDeck.name}: Add Card</h2>
        <CardForm />
      </div>
    </>
  );
}

export default AddCard;