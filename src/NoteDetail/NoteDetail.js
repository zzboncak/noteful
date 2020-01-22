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
        if(this.context.notes.length === 0) {
            return (
                <div>loading...</div>
            );
        } else {
            const note = this.context.notes.find(note => note.id == this.props.match.params.noteId);
            const folder = this.context.folders.find(folder => folder.id === note.folderId);
            let isNoteDetail = (this.props.match.path === '/note/:noteId');
            return (
                <div className="note-detail-container">
                    <div className="left-sidebar">
                        <Link to="/">
                            <button type="button" className="go-back-button" onClick={this.props.history.goBack}>Go Back</button>
                        </Link>
                        <h2>{folder !== undefined ? folder.name : ""}</h2>
                    </div>
                    <div className="note-details">
                        <Note id={this.props.match.params.noteId} name={note.note_name} modified={note.modified} isNoteDetail={isNoteDetail} history={this.props.history} />
                        <p className="note-content">{note.note_content}</p>
                    </div>
                </div>
            );
            
        }
    }
}

export default NoteDetail;