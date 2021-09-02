import React from 'react';
import SampleImage from '../../resources/images/sample-image.png';
import './note-detail.css';

export class NoteDetail extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="main">
          <div className="main-header">
            <h1>Mario Kart 8 Notes</h1>
            <button id="edit-button">Edit</button>
          </div>
          <h3>Rainbow Road - Shortcuts</h3>
          <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
          elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
          aliquyam erat, sed diam voluptua.</p>
          <img className="main-image" src={SampleImage} />
          <div className="main-image-caption">Lorem ipsum dolor sit amet!</div>
          <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua.</p>
          <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
          elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
          aliquyam erat, sed diam voluptua.</p>
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
