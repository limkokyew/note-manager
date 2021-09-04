import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Topbar } from './components/topbar/topbar.jsx';
import { NoteDetail } from './components/note-detail/note-detail.jsx';
import { NoteOverview } from './components/note-overview/note-overview.jsx';

class App extends React.Component {  
  render() {
    return (
      <>
        <Topbar />
        <NoteOverview />
      </>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
