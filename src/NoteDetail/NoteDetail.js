import React from 'react';
import { Link } from 'react-router-dom';
import Note from '../Note/Note';
import './NoteDetail.css';
import NoteContext from '../NoteContext';

class NoteDetail extends React.Component {
    static contextType = NoteContext;

    componentDidMount() {
        this.context.updateNoteId(this.props.match.params.noteId);
    }


    render() {
        console.log(`NoteDetail context`, this.context);
        console.log(this.props.match.params.noteId);
        const note = this.context.notes.find(note => note.id === this.context.currentNoteId);
        const folder = this.context.folders.find(folder => folder.id === note.folderId);
        return (
            <div className="note-detail-container">
                <div className="left-sidebar">
                    <Link to="/">
                        <button type="button" className="go-back-button" onClick={this.props.history.goBack}>Go Back</button>
                    </Link>
                    <h2>{folder.name}</h2>
                </div>
                <div className="note-details">
                    <Note id={this.props.noteId} name={note.name} modified={note.modified} />
                    <p className="note-content">{note.content}</p>
                </div>
            </div>
        );
    }
}

export default NoteDetail;