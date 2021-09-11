import React from "react";
import { withRouter } from "react-router-dom";

import "./note-detail.css";

/**
 * Fetches the note with the appropriate id from the database. Notes use the
 * following schema:
 *  - category: String used to categorize notes.
 *  - content: String Content of the note.
 *  - create_date: Timestamp of when the note was created.
 *  - edit_date: Timestamp of when the last modification took place.
 *  - id: Numeric, unique identifier.
 *  - name: String, name of the note.
 * @param  {int}   id  Numeric id of the note to be fetched.
 * @return {Array}     SELECT statement results.
 */
async function getNoteContents(id) {
  const notes = window.api.runDBStatement(
    "runDBStatement",
    `SELECT * FROM notes where id == ${id};`
  );
  return notes;
}

export class NoteDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentNote: {}}
  }
  
  componentDidMount() {
    const id = this.props.match.params.id;
    getNoteContents(id).then((result) => {
      if (result.length > 0) {
        this.setState({currentNote: result[0]});
      } else {
        console.error("FATAL: Coult not find note with id " + id + ".");
      }
    });
  }
  
  render() {
    return (
      <div className="container">
        <div className="main">
          <div className="main-header">
            <h1>{this.state.currentNote.name}</h1>
            <button id="edit-button">Edit</button>
          </div>
          <p>{this.state.currentNote.content}</p>
        </div>
        <div className="table-of-contents">
          <span className="table-of-contents-header">Table of Contents</span>
          <div className="table-of-contents-chapters-wrapper">
            <div className="table-of-contents-chapters active">Rainbow Road - Shortcuts</div>
            <div className="table-of-contents-chapters">GCN Sherbet Land - Shortcuts</div>
            <div className="table-of-contents-chapters">3DS Neo Bowser City - Shortcuts</div>
          </div>
        </div>
      </div>
    );
  }
}
