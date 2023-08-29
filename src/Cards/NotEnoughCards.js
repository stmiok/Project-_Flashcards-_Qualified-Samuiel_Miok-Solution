import React from "react";
import { Link } from "react-router-dom";

function NotEnoughCards({ id, cards }) {
  return (
    <div className="d-flex flex-column">
      <h3>Not enough cards.</h3>
      <p>
        You must have at least 3 cards to study. There are {cards} cards in this
        deck.
      </p>
      <div>
        <Link className="btn btn-primary" to={`/decks/${id}/cards/new`}>
          <i className="fas fa-plus"></i> Add Cards
        </Link>
      </div>
    </div>
  );
}

export default NotEnoughCards;
