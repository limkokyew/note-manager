import React from "react";
import { Link } from "react-router-dom";
import "./note-overview.css";

/**
 * Fetches id, name and edit_date of all notes from the database.
 * @return {Array}    SELECT statement results.
 */
async function getNotes() {
  const notes = window.api.runDBStatement(
    "runDBStatement",
    `SELECT id, name, edit_date FROM notes;`
  );
  return notes;
}

/**
 * Creates note DOM elements from an array of notes.
 * @param {Array} props Array of note elements. Each element must have
                        attributes id, name and edit_date.
 * @return  {JSX}       Returns the JSX of all notes.
 */
function NoteElements(props) {
  const notes = props.notes;
  if (notes !== null) {
    const noteItems = notes.map((noteElement) => {
      return (
        <Link className="overview-item" key={noteElement.id} to={`/notes/${noteElement.id}`}>
          <div className="overview-item-header overview-item-header-edu"></div>
          <div className="overview-item-description">
            <span className="overview-item-description-title">{noteElement.name}</span>
            <span className="overview-item-description-edit">last edited on {noteElement.edit_date}</span>
          </div>
        </Link>
      );
    });
    return noteItems;
  } else {
    return null;
  }
}

export class NoteOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {noteElements: null};
  }
  
  updateNotes() {
    getNotes().then((result) => {
      this.setState({noteElements: result});
    });
  }
  
  componentDidMount() {
    this.updateNotes();
  }
  
  render() {
    return (
      <div className="overview-container">
        <div className="overview-header">
          <button className="overview-header-button" id="add-button">Add</button>
        </div>
        <h3>Recently Viewed</h3>
        <div className="overview-item-container">
          <a className="overview-item" href="https://www.google.de">
            <div className="overview-item-header overview-item-header-gaming"></div>
            <div className="overview-item-description">
              <span className="overview-item-description-title">Mario Kart 8 Notes</span>
              <span className="overview-item-description-edit">last edited on Aug 31, 2021 11:21</span>
            </div>
          </a>
        </div>
        <h3>All Notes</h3>
        <div className="overview-item-container">
          <NoteElements notes={this.state.noteElements} />
        </div>
      </div>
    );
  }
}
