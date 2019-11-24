import React from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Home/Home';
import STORE from './dummy-store';
import NoteDetail from './NoteDetail/NoteDetail';
import NoteContext from './NoteContext';

class App extends React.Component {

  state = {
    store: STORE,
    currentFolderId: null,
    currentNoteId: null
  }

  updateFolderId = (id) => {
    console.log(`updateFolderId Fired!`);
    this.setState({
      currentFolderId: id
    });
  }

  updateNoteId = (id) => {
    console.log(`updateNoteId Fired!`);
    this.setState({
      currentNoteId: id
    });
  }

  handleDelete = () => {
    console.log(`You clicked a delete button!`);
  }
  
  render() {
    const noteContext = {
      folders: this.state.store.folders,
      notes: this.state.store.notes,
      updateFolderId: this.updateFolderId,
      updateNoteId: this.updateNoteId,
      currentFolderId: this.state.currentFolderId,
      currentNoteId: this.state.currentNoteId,
      handleDelete: this.handleDelete
    };

    return (
      <NoteContext.Provider value={noteContext}>
        <div className="App">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h1 className="main-header" onClick={() => this.updateFolderId(null)}>Noteful</h1>
          </Link>
          <main className="main-container">
            <Route
              exact path='/'
              component={Home}
            />
            <Route
              path='/folder/:folderId'
              component={Home}
            />
            <Route
              path='/note/:noteId'
              component={NoteDetail}
            />
          </main>
        </div>
      </NoteContext.Provider>
    );
  }
  
}

export default App;
