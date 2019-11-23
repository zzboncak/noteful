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
  }

  updateFolderId = (id) => {
    this.setState({
      currentFolderId: id
    });
  }

  handleDelete = () => {
    console.log(`You clicked a delete button!`);
  }
  
  render() {
    console.log(`App props`, this.props);
    const noteContext = {
      folders: this.state.store.folders,
      notes: this.state.store.notes,
      currentFolderId: this.state.currentFolderId,
      updateFolderId: this.updateFolderId,
      handleDelete: this.handleDelete
    };

    return (
      <NoteContext.Provider value={noteContext}>
        <div className="App">
          <Link to="/" style={{ textDecoration: 'none' }}><h1 className="main-header">Noteful</h1></Link>
          <main className="main-container">
            <Route
              exact path='/'
              render={() =>
                <Home store={this.state.store} />}
            />
            <Route
              path='/folder/:folderId'
              render={(props) => <Home store={this.state.store} props={props} folderId={props.match.params.folderId} />}
            />
            <Route
              path='/note/:noteId'
              render={(props) => <NoteDetail store={this.state.store} noteId={props.match.params.noteId} goBack={() => props.history.goBack()} />}
            />
          </main>
        </div>
      </NoteContext.Provider>
    );
  }
  
}

export default App;
