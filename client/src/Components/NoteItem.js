import React, { useContext } from "react";
import noteContext from "../context/notes/NoteContext";
import "../css/NoteItem.css";

export const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  // Function to convert date to IST format
  const convertToIST = (dateString) => {
    const options = {
      timeZone: "Asia/Kolkata",
      hour12: true,
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    return new Date(dateString).toLocaleString("en-IN", options);
  };

  return (
    <>
      <div className="col-md-6">
        <div className="card my-3 glassmorphism-card">
          <div className="card-body">
            <div className="card-header">
              <h5 className="card-title">{note.title}</h5>
              <p className="card-date">Updated On: {convertToIST(note.date)}
              <br></br>
              <b>Tag: </b>{note.tag}
              </p>
            </div>
            <p className="card-text">{note.description}</p>
            <div className="card-icons">
              <i
                className="fa-solid fa-trash mx-2"
                onClick={() => {
                  deleteNote(note._id);
                }}
              ></i>
              <i
                className="fa-solid fa-pen-to-square mx-2"
                onClick={() => {
                  updateNote(note);
                }}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
