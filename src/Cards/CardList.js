import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { deleteCard } from "../utils/api";

function CardList({ cards }) {
  // get browesers history object and url
  const history = useHistory();
  const { url } = useRouteMatch();

  // handle delete card
  async function handleDelete(id) {
    // abort controller for handling abort signals 
    const abortCon = new AbortController();
    try {
      // display confirmation text to user
      const response = window.confirm(
        "Delete this card?\n\nYou will not be able to recover it."
      );
      // if user confirms deletion..
      if (response) {
        // call deletCard API function with card id and the abort signal
        await deleteCard(id, abortCon.signal);
        // reload window to show updated card list 
        window.location.reload();
      }
      // throw error if there are any 
    } catch (error) {
      throw error;
    }
  }

  return (
    cards && (
      <div className="d-flex flex-column">
        {cards.map((card) => (
          <div className="card" key={card.id}>
            <div className="card-body d-flex">
              <div className="card-info w-50 m-2">
                <p>{card.front}</p>
              </div>
              <div className="card-info w-50 m-2">
                <p>{card.back}</p>
                <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-secondary mr-2"
                    type="button"
                    onClick={() => history.push(`${url}/cards/${card.id}/edit`)}
                  >
                    <i className="fas fa-pencil"></i> Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => handleDelete(card.id)}
                  >
                    <i className="fas fa-trash-can"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  );
}

export default CardList;
