import React from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Home/Home';
import NoteDetail from './NoteDetail/NoteDetail';
import NoteContext from './NoteContext';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';

class App extends React.Component {

  state = {
    folders: [],
    notes: [],
    currentFolderId: undefined,
    currentNoteId: undefined,
    isAddFormVisible: false,
    isAddNoteVisible: false
  }

  toggleFolderFormView = () => {
    let newView = !this.state.isAddFormVisible;
    this.setState({
      isAddFormVisible: newView,
    });
  }

  toggleNoteFormView = () => {
    let newView = !this.state.isAddNoteVisible;
    this.setState({
      isAddNoteVisible: newView,
    });
  }

  updateFolderId = (id) => {
    this.setState({
      currentFolderId: id
    });
  }

  updateNoteId = (id) => {
    this.setState({
      currentNoteId: id
    });
  }

  handleDelete = (noteId) => {
    let currentNotes = this.state.notes;
    let newNotes = currentNotes.filter(note => note.id !== noteId);
    this.setState({ notes: newNotes });
  }

  componentDidMount() {
    fetch('http://localhost:9090/folders').then(res => {
      if (!res.ok) {
        throw new Error(`something went wrong`)
      }
      return res.json();
    })
    .then(data => this.setState({ folders: data }))
    .catch(err => console.log(err));

    fetch('http://localhost:9090/notes').then(res => {
      if (!res.ok) {
        throw new Error(`something went wrong`)
      }
      return res.json();
    })
    .then(data => this.setState({ notes: data }))
    .catch(err => console.log(err));
  }

  renderRoutes() {
    return (
      <>
        {['/','/folder/:folderId'].map((path, i) => (
          <Route exact path={path} key={i} component={Home} />
        ))}
        <Route
            path='/note/:noteId'
            component={NoteDetail}
          />    
      </>
    );
  }

  renderPage() {
    if(this.state.isAddFormVisible) {
      return <AddFolder />;
    } else if (this.state.isAddNoteVisible) {
      return <AddNote />;
    } else {
      return this.renderRoutes();
    }
  }
  
  render() {
    const noteContext = {
      folders: this.state.folders,
      notes: this.state.notes,
      updateFolderId: this.updateFolderId,
      updateNoteId: this.updateNoteId,
      currentFolderId: this.state.currentFolderId,
      currentNoteId: this.state.currentNoteId,
      handleDelete: this.handleDelete,
      toggleFolderFormView: this.toggleFolderFormView,
      toggleNoteFormView: this.toggleNoteFormView
    };

    return (
      <NoteContext.Provider value={noteContext}>
        <div className="App">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h1 className="main-header" onClick={() => this.updateFolderId(null)}>Noteful</h1>
          </Link>
          <main className="main-container">
            {this.renderPage()}
          </main>
        </div>
      </NoteContext.Provider>
    );
  }
  
}

export default App;
