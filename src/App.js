import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Home from './Home/Home';
import STORE from './dummy-store';
import NoteDetail from './NoteDetail/NoteDetail';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Noteful</h1>
        <main className="main-container">
          <Route
            exact path='/'
            render={() =>
              <Home store={STORE} />}
          />
          <Route
            path='/folder/:folderId'
            render={(props) => <Home store={STORE} props={props} folderId={props.match.params.folderId} />}
          />
          <Route
            path='/note/:noteId'
            render={(props) => <NoteDetail store={STORE} noteId={props.match.params.noteId} />}
          />
        </main>
      </div>
    );
  }
  
}

export default App;
