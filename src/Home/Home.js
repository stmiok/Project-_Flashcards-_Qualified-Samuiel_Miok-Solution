import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeckList from "../Deck/DeckList";
import { listDecks } from "../utils/api";

function Home() {
  const [decks, setDecks] = useState([]); // state to hold decks 

  // effect hook 
  useEffect(() => {
    const abortCon = new AbortController(); // abort contorller for cleanup 
    async function loadDecks() { // function to load decks 
      try {
        const loadedDecks = await listDecks(); // fetch list of decks 
        setDecks([...loadedDecks]); // update state with fetched deck data 
        // catch and throw errors if any
      } catch (error) {
        throw error;
      }
    }
    // call function to fetch and update deck data 
    loadDecks();
    // cleanup function 
    return abortCon.abort();
  }, []); // empty dependancy array to assure effect only runs once 

  return (
    <div className="d-flex flex-column">
      <div className="mb-2">
        <Link className="btn btn-secondary" to="/decks/new">
          <i className="fas fa-plus"></i> Create Deck
        </Link>
      </div>
      <div>
        <DeckList decks={decks} />
      </div>
    </div>
  );
}

export default Home;
