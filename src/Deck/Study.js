import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";
import Card from "../Cards/Card";
import NavBar from "../Layout/NavBar";
import NotEnoughCards from "../Cards/NotEnoughCards";

function Study() {
  // access to browser history API 
  const history = useHistory();
  // extract deckId parameter from URL
  const { deckId } = useParams();

  // state variables 
  const [count, setCount] = useState(0); // total number of cards
  const [card, setCard] = useState({}); // current displayed card
  const [cards, setCards] = useState([]); // list of all cards in deck 
  const [deck, setDeck] = useState({}); // deck info 
  const [flipped, setFlipped] = useState(false); // state to manage card flip 
  const [nextIndex, setNextIndex] = useState(1); // index of next card to display 

  // effect hook to load deck data and cards when deckId changes 
  useEffect(() => {
    // abort contoller for cleanup 
    const abortCon = new AbortController();
    // fetch and set deck and card data 
    async function getDeck() {
      try {
        if (deckId) {
          const haveDeck = await readDeck(deckId, abortCon.signal);
          setDeck({ ...haveDeck });
          setCount(haveDeck.cards.length);
          setCards([...haveDeck.cards]);
          setCard({ ...haveDeck.cards[0] });
        }
        // catch and throw any existing errors 
      } catch (error) {
        throw error;
      }
    }
    // call function to fetch data 
    getDeck();
    // cleanup function 
    return () => abortCon.abort();
  }, [deckId]);

  // fucntion to handle flipping cards 
  const handleFlip = () => {
    setFlipped(!flipped);
  };

  // function to handle going to the next card 
  const handleNext = () => {
    if (nextIndex < cards.length) {
      setCard(cards[nextIndex]);
      setNextIndex((currentIndex) => currentIndex + 1);
      handleFlip();
    } else {
      // popup window to ask to restart cards or return home
      const response = window.confirm(
        "Restart cards\n\nClick 'cancel' to return to the home page."
      );
      // either resets cards or returns to home page 
      response ? reset() : history.push("/");
    }
  };

  // function to reset study session 
  const reset = () => {
    setCard(cards[0]);
    setNextIndex(1);
    handleFlip();
  };

  return (
    <>
      <div className="d-flex">
        <NavBar
          linkName={deck.name}
          link={`/decks/${deck.id}`}
          pageName="Study"
        />
      </div>
      <h2>{deck.name}: Study</h2>
      {count < 3 || !count ? (
        <NotEnoughCards name={deck.name} id={deck.id} cards={count} />
      ) : (
        <Card
          card={card}
          count={count}
          index={nextIndex}
          flipped={flipped}
          flip={handleFlip}
          next={handleNext}
        />
      )}
    </>
  );
}

export default Study;