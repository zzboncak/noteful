import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import NotesList from '../NotesList/NotesList';
import NoteContext from '../NoteContext';

class Home extends React.Component {
    static contextType = NoteContext;

    componentDidMount() {
        this.context.updateFolderId(this.props.match.params.folderId);
    }

    render() {
        return (
            <main className="main-container">
                <Sidebar />
                <NotesList />
            </main>
        )
    }
}

export default Home;