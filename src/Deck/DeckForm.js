import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { createDeck, readDeck, updateDeck } from "../utils/api";

function DeckForm({ mode }) {
  // access to browsers history API
  const history = useHistory();
  // ectract deckId parameter from the url 
  const { deckId } = useParams();
  // inital form data structure
  const initFormData = {
    name: "",
    description: "",
  };

  // state for holding form data 
  const [formData, setFormData] = useState({ ...initFormData });

  // handler for form changes 
  const handleChange = ({ target }) =>
    setFormData({ ...formData, [target.name]: target.value });

  // effect hook to load deck data when in edit mode 
  useEffect(() => {
    const abortCon = new AbortController();

    // function to fetch and set the from data when in edit mode 
    async function getEditDeck() {
      try {
        const deckToEdit = await readDeck(deckId, abortCon.signal);
        setFormData({ ...deckToEdit });
        // throw error if any 
      } catch (error) {
        throw error;
      }
    }
    // checks if in edit mode and fetch data accordingly
    if (mode === "edit") {
      getEditDeck();
    }
    // cleanup function 
    return () => abortCon.abort();
  }, [deckId, mode]);

  // handle form submission 
  const handleSubmit = (event) => {
    event.preventDefault();
    const abortCon = new AbortController();

    // create new deck 
    async function createNewDeck() {
      try {
        const newDeck = await createDeck(formData, abortCon.signal);
        setFormData({ ...initFormData });
        history.push(`/decks/${newDeck.id}`);
      } catch (error) {
        throw error;
      }
    }

    // function to edit existing deck
    async function editDeck() {
      try {
        await updateDeck(formData, abortCon.signal);
        history.push(`/decks/${deckId}`);
      } catch (error) {
        throw error;
      }
    }
    // call appropriate function based on mode 
    mode === "create" ? createNewDeck() : editDeck();

    // cleanup function 
    return () => abortCon.abort();
  };

  return (
    <div className="d-flex flex-column">
      <form className="col-12" onSubmit={handleSubmit}>
        <div className="row form-group">
          <label htmlFor="name">Name</label>
          <input
            className="form-control form-control-lg"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Deck Name"
          />
        </div>
        <div className="row form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control form-control-lg"
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Brief description of the deck"
          />
        </div>
        <div className="row">
          <Link
            to={mode === "create" ? "/" : `/decks/${deckId}`}
            className="btn btn-secondary mr-2"
          >
            Cancel
          </Link>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default DeckForm;


