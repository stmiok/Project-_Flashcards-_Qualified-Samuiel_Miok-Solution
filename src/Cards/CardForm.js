import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createCard, updateCard, readCard } from "../utils/api";

function CardForm({ mode = "create" }) {
  const history = useHistory();
  const { deckId, cardId } = useParams();
  // inital form data with empty front and back
  const initFormData = {
    front: "",
    back: "",
  };

  // state hook to manage form data
  const [formData, setFormData] = useState({ ...initFormData });
  
  // event handler to update form data 
  const handleChange = ({ target }) =>
    setFormData({ ...formData, [target.name]: target.value });

    // effect hook to fetch and populate form data when editing 
  useEffect(() => {
    const abortCon = new AbortController();
    async function getEditCard() {
      try {
        // fetch card data to edit 
        const cardToEdit = await readCard(cardId, abortCon.signal);
        setFormData({ ...cardToEdit });
      } catch (error) {
        throw error;
      }
    }
    // if editing fetch card data 
    if (mode === "edit") {
      getEditCard();
    }
    // cleanup function to abort any ongoing fetch 
    return () => abortCon.abort();
  }, [cardId, mode]);

  // submission handler 
  const handleSubmit = (event) => {
    event.preventDefault();
    const abortCon = new AbortController();
    
    // function to add new card
    async function addCard() {
      try {
        // API call to create new card for specified deck
        await createCard(deckId, formData, abortCon.signal);
        // reset for data to inital values 
        setFormData({ ...initFormData });
        // throw errors if there are any
      } catch (error) {
        throw error;
      }
    }

    // function to edit cards
    async function editCard() {
      try {
        // API call to update card with new data
        await updateCard(formData, abortCon.signal);
        // redirect to the decks page after edit 
        history.push(`/decks/${deckId}`);
        // throw errors if there are any 
      } catch (error) {
        throw error;
      }
    }
    // call either edit or create 
    mode === "edit" ? editCard() : addCard();
  };

  return (
    <div className="d-flex flex-column">
      <form className="col-12" onSubmit={handleSubmit}>
        <div className="row form-group">
          <label htmlFor="front">Front</label>
          <textarea
            type="text"
            className="form-control form-control-lg"
            id="front"
            name="front"
            value={formData.front}
            onChange={handleChange}
            placeholder="Front of card"
          />
        </div>
        <div className="row form-group">
          <label htmlFor="back">Back</label>
          <textarea
            type="text"
            className="form-control form-control-lg"
            id="back"
            name="back"
            value={formData.back}
            onChange={handleChange}
            placeholder="Back of card"
          />
        </div>
        <div className="row">
          <Link to={`/decks/${deckId}`} className="btn btn-secondary mr-2">
            {mode === "edit" ? "Cancel" : "Done"}
          </Link>
          <button type="submit" className="btn btn-primary">
            {mode === "edit" ? "Submit" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
export default CardForm;
