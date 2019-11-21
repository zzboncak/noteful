import React from 'react';
import Note from '../Note/Note';
import './NoteDetail.css';

class NoteDetail extends React.Component {
    render() {
        console.log(this.props);
        console.log(this.props.noteId);
        const note = this.props.store.notes.find(note => note.id === this.props.noteId);
        console.log(`specific note note info`, note);
        const folder = this.props.store.folders.find(folder => folder.id === note.folderId);
        console.log(`specific note folder info`, folder);
        return (
            <div className="note-detail-container">
                <div className="left-sidebar">
                    <button type="button" className="go-back-button">Go Back</button>
                    <h3>{folder.name}</h3>
                </div>
                <div className="note-details">
                    <Note id={this.props.noteId} name={note.name} modified={note.modified} />
                    <p className="note-content">{note.content}</p>
                </div>
            </div>
        )
    }
}

export default NoteDetail;