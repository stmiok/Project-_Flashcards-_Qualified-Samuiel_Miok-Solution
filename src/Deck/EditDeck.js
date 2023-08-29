import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../Layout/NavBar";
import { readDeck } from "../utils/api";
import DeckForm from "./DeckForm";

function EditDeck() {
  // state to store current deck data
  const [deck, setDeck] = useState({});
  // extract deckId parameter form the url 
  const { deckId } = useParams();

  // fetch and set current deck data
  useEffect(() => {

    // abort controller for cleanup 
    const abortCon = new AbortController();

    // fetch current deck data
    async function getCurrentDeck() {
      try {
        // fetch deck data using readDeck function from API 
        const currentDeck = await readDeck(deckId, abortCon.signal);
        setDeck({ ...currentDeck });
        // catch and throw any errors 
      } catch (error) {
        throw error;
      }
    }
    // call function to fetch current deck data 
    getCurrentDeck();

    // cleanup function 
    return () => {
      abortCon.abort();
    };
  }, [deckId]);

  return (
    <>
      <div className="d-flex">
        <NavBar
          linkName={deck.name}
          link={`/decks/${deck.id}`}
          pageName={"Edit Deck"}
        />
      </div>
      <div className="d-flex flex-column">
        <h2>Edit Deck</h2>
        <DeckForm mode="edit" />
      </div>
    </>
  );
}

export default EditDeck;
