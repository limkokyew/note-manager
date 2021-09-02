import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Topbar } from './components/topbar/topbar.jsx';
import { NoteDetail } from './components/note-detail/note-detail.jsx';

/* function render() {
  ReactDOM.render(<h2>Hello from React!</h2>, document.getElementById('root'));
}

render(); */

class App extends React.Component {
  render() {
    return (
      <>
        <Topbar />
        <NoteDetail />
      </>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
