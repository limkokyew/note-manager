import React from "react";
import { withRouter } from "react-router-dom";
import { NoteEditor } from "./note-editor.jsx";

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
    
    // Name of currentNote must be initialized with an empty string, otherwise,
    // the <input> element changes from uncontrolled to controlled
    this.state = {
      currentNote: {name: ""},
      editMode: false,
    };
    
    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.updateEdit = this.updateEdit.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
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
  
  toggleEditMode() {
    this.setState({editMode: !this.state.editMode});
  }
  
  updateNoteAttribute(key, value) {
    const currentDate = new Date().toISOString().replace("T", " ").substr(0, 19);
    window.api.runDBStatement(
      "runDBStatement", `
      UPDATE notes
      SET ${key} = "${value}",
          edit_date = "${currentDate}"
      WHERE id = ${this.state.currentNote.id};
      `
    ).then((result) => {
      let updateNote = { ...this.state.currentNote };
      updateNote[key] = value;
      this.setState({currentNote: updateNote});
    });
  }
  
  updateTitle(inputEvent) {
    this.updateNoteAttribute("name", inputEvent.target.value);
  }
  
  updateEdit(newContent) {
    this.setState({editMode: !this.state.editMode});
    this.updateNoteAttribute("content", newContent);
  }
  
  render() {
    return (
      <div className="flex flex-row container">
        <div className="main">
          <div className="flex flex-row flex-vertical-center">
            <input id="title" type="text" defaultValue={this.state.currentNote.name} onBlur={this.updateTitle} />
              {!this.state.editMode &&
                <button id="edit-button" className="button-outline" onClick={this.toggleEditMode}>Edit</button>
              }
          </div>
          <NoteEditor
            editMode={this.state.editMode}
            note={this.state.currentNote}
            handleCancel={this.toggleEditMode}
            handleUpdate={this.updateEdit}
          />
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
