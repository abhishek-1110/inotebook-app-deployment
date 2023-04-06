import React, { useContext, useState } from "react";
import noteContext from "../context/notes/NoteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({title: "", description: "", tag: ""})
  
  const onChange = (e) => {
        // spread 
        setNote({...note, [e.target.name]: e.target.value })
  };

  const handleClick = (e) => {
    // to prevent page from loading
    e.preventDefault();

    // to do handle with alert 
    if (note.title.length <= 3 || note.description.length <= 3 || note.tag.length <= 3) {
      props.showAlert("Length should be greater than or equal to 3", "danger");
      return;
    }
    props.showAlert(" Note added Successfully...", "success");
    setNote(({title: "", description: "", tag: ""}));
    addNote(note.title, note.description, note.tag);
  };

  return (
    <div className="container my-3">
      <h2>Add a Note</h2>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          value={note.title}
          onChange={onChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          rows="3"
          value={note.description}
          name="description"
          onChange={onChange}
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Tag
        </label>
        <input type = "text"
          className="form-control"
          id="tag"
          name="tag"
          value={note.tag}
          onChange={onChange}
        ></input>
      </div>
      <div className="button">
        <button type="button" className="btn btn-primary" onClick={handleClick}>
          Add Note
        </button>
      </div>
    </div>
  );
};

export default AddNote;
