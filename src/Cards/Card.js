import React from "react";

function Card({ card, count, index, flip, flipped, next }) {
  const nextButton = (
    <button type="button" className="btn btn-primary" onClick={next}>
      Next Card
    </button>
  );

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">
            Card {index} of {count}
          </h4>
          <p className="card-info">{!flipped ? card.front : card.back}</p>
          <button
            type="button"
            className="btn btn-secondary mr-2"
            onClick={flip}
          >
            Flip
          </button>
          {flipped && nextButton}
        </div>
      </div>
    </>
  );
}

export default Card;
