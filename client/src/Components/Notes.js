import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/NoteContext";
import { NoteItem } from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);

  const { notes, getNotes, editNote } = context;

  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    } else {
      navigate("/login");
    }
  },);

  const ref = useRef(null);
  const refClose = useRef();

  const [note, setNote] = useState({
    id: "",
    title: "",
    description: "",
    tag: "",
  });

  const onChange = (e) => {
    // spread
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const updateNote = (currentNote) => {
    // to show or hide modal
    ref.current.click();
    setNote({
      id: currentNote._id,
      title: currentNote.title,
      description: currentNote.description,
      tag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    // to prevent page from loading
    e.preventDefault();
    console.log("Updating the note.....");
    editNote(note.id, note.title, note.description, note.tag);
    props.showAlert("Note Updated", "success");

    refClose.current.click();
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        style={{ display: "none" }}
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        useRef={ref}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit your Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
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
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="3"
                  name="description"
                  value={note.description}
                  onChange={onChange}
                  minLength={3}
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  Tag
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tag"
                  name="tag"
                  value={note.tag}
                  onChange={onChange}
                ></input>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your Notes</h2>
        {/* To map your notes and display */}
        <div className="container mx-2">
          {notes.length === 0 && "No Notes to Display.. "}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem
              key={note._id}
              updateNote={updateNote}
              note={note}
            ></NoteItem>
          );
        })}
      </div>
    </>
  );
};

export default Notes;
