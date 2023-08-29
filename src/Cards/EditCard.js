import { useParams } from "react-router-dom";
import NavBar from "../Layout/NavBar";
import { readDeck } from "../utils/api";
import CardForm from "./CardForm";
import React, { useEffect, useState } from "react";

function EditCard() {
  // params hook to get deckId and CardId from URl
  const { deckId, cardId } = useParams();
  // created state variable using useState hook
  const [deck, setDeck] = useState({});

  // fetch and set deck info 
  useEffect(() => {
    // abort controller created 
    const abortCon = new AbortController();
    // function to get deck info 
    async function getDeck() {
      try {
        // if deckId exists...
        if (deckId) {
          // fetch deck info using readDeck function from API 
          const haveDeck = await readDeck(deckId, abortCon.signal);
          // update deck state with fetched deck info 
          setDeck({ ...haveDeck });
        }
        // throw errors if any 
      } catch (error) {
        throw error;
      }
    }
    // call getDeck to initate fetch
    getDeck();
    // return clean up function 
    return () => abortCon.abort();
  }, [deckId]);

  return (
    <div>
      <div className="d-flex">
        <NavBar
          linkName={`Deck ${deck.name}`}
          link={`/decks/${deck.id}`}
          pageName={`Edit Card ${cardId}`}
        />
      </div>
      <div className="d-flex flex-column">
        <h2>Edit Card</h2>
        <CardForm mode="edit" />
      </div>
    </div>
  );
}

export default EditCard;
