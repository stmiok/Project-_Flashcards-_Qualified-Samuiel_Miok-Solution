import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams, useRouteMatch } from "react-router-dom";
import { readDeck, deleteDeck } from "../utils/api";
import CardList from "../Cards/CardList";
import NavBar from "../Layout/NavBar";

function Deck() {
  const history = useHistory(); // access browsers history API 
  const { url } = useRouteMatch(); // get url or current route 
  const { deckId } = useParams(); // get deckId parameters from the url 
  const [deck, setDeck] = useState({}); // state for holding deck data 

  // effect hook so fetch and set deck data 
  useEffect(() => {
    // abort controller for cleanup 
    const abortCon = new AbortController();
    // fetch and set deck data
    async function getDeck() {
      try {
        if (deckId) {
          const haveDeck = await readDeck(deckId, abortCon.signal);
          setDeck({ ...haveDeck });
        }
        // catch and throw any errors 
      } catch (error) {
        throw error;
      }
    }
    // calls fucntion to get deck data 
    getDeck();
    // cleanup function 
    return () => abortCon.abort();
  }, [deckId]);

  // function to handle deck delete 
  async function handleDelete(id) {
    try {
      // window to confirm deletion from user
        const response = window.confirm(
            "Delete this deck?\n\nYou will not be able to recover it."
        );
        // if delete selected.. 
        if (response) {
            const abortCon = new AbortController(); // abort contorller for cleanup 
            await deleteDeck(id, abortCon.signal); // call api to delete the deck 
            history.push("/"); // navigate to homepage 
        }
        // catch and throw any errors if any
    } catch (error) {
        throw error
    }
  }

  return (
    <>
      <NavBar pageName={deck.name} />
      {!deck.id ? (
        <>
          <h2>Loading deck...</h2>
        </>
      ) : (
        <>
          <div className="d-flex flex-column">
            <div className="d-flex flex-column">
              <h2>{deck.name}</h2>
              <p>{deck.description}</p>
            </div>
            <div className="d-flex justify-content-between">
              <div className="flex-item">
                <Link
                  className="btn btn-secondary mr-2"
                  to={`/decks/${deck.id}/edit`}
                >
                  <i className="fas fa-pencil"></i> Edit
                </Link>
                <Link
                  className="btn btn-primary mr-2"
                  to={`/decks/${deck.id}/study`}
                >
                  <i className="fas fa-book mr-1"></i> Study
                </Link>
                <Link className="btn btn-primary" to={`${url}/cards/new`}>
                  <i className="fas fa-plus"></i> Add Cards
                </Link>
              </div>
              <div className="flex-item">
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => handleDelete(deck.id)}
                >
                  <i className="fas fa-trash-alt mr-1"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column mt-4">
            <h2>Cards</h2>
            <CardList cards={deck.cards} />
          </div>
        </>
      )}
    </>
  );

}

export default Deck;
