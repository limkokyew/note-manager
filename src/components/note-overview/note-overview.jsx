import React from 'react';
import './note-overview.css';

export class NoteOverview extends React.Component {
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
          <a className="overview-item" href="https://www.google.de">
            <div className="overview-item-header overview-item-header-edu"></div>
            <div className="overview-item-description">
              <span className="overview-item-description-title">Blender Notes</span>
              <span className="overview-item-description-edit">last edited on Sep 01, 2021 00:53</span>
            </div>
          </a>
        </div>
      </div>
    );
  }
}
