import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Home from './Home/Home';
import STORE from './dummy-store';

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
          {/* <Route
            exact path='/'
            render={() => 
              <Sidebar folders={STORE.folders}/>}
          />
          <Route
            exact path='/'
            render={() =>
            <NotesList notes={STORE.notes}/>}
          /> */}
        </main>
      </div>
    );
  }
  
}

export default App;
