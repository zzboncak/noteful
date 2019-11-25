import React from 'react';
import { Link } from 'react-router-dom';
import Note from '../Note/Note';
import './NoteDetail.css';
import NoteContext from '../NoteContext';

class NoteDetail extends React.Component {
    static contextType = NoteContext;

    render() {
        const note = this.context.notes.find(note => note.id === this.props.match.params.noteId);
        //console.log(note);
        const folder = this.context.folders.find(folder => folder.id === note.folderId);
        //console.log(folder);
        console.log(`Note Detail Props`, this.props);
        let isNoteDetail = (this.props.match.path === '/note/:noteId');
        return (
            <div className="note-detail-container">
                <div className="left-sidebar">
                    <Link to="/">
                        <button type="button" className="go-back-button" onClick={this.props.history.goBack}>Go Back</button>
                    </Link>
                    <h2>{folder.name}</h2>
                </div>
                <div className="note-details">
                    <Note id={this.props.match.params.noteId} name={note.name} modified={note.modified} isNoteDetail={isNoteDetail} />
                    <p className="note-content">{note.content}</p>
                </div>
            </div>
        );
    }
}

export default NoteDetail;