import React from 'react';
import './note-overview.css';

async function getNotes() {
  const notes = window.api.runDBStatement(
    "runDBStatement",
    `SELECT id, name, edit_date FROM notes;`
  );
  return notes;
}

function NoteElements(props) {
  const notes = props.notes;
  if (notes !== null) {
    console.log("VICTORY!");
    console.log(notes);
    const noteItems = notes.map((noteElement) => {
      return (
        <a className="overview-item" key={noteElement.id} href="https://www.google.de">
          <div className="overview-item-header overview-item-header-edu"></div>
          <div className="overview-item-description">
            <span className="overview-item-description-title">{noteElement.name}</span>
            <span className="overview-item-description-edit">last edited on {noteElement.edit_date}</span>
          </div>
        </a>
      );
    });
    console.log(noteItems);
    return noteItems;
  } else {
    console.log("DEFEAT!");
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
      console.log(result);
      console.log("I have set state!");
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
