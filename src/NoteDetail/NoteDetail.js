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
        if(this.context.currentNoteId !== null) {
            const note = this.context.notes.find(note => note.id === this.props.match.params.noteId);
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
                        <Note id={this.props.match.params.noteId} name={note.name} modified={note.modified} isNoteDetail={isNoteDetail} history={this.props.history} />
                        <p className="note-content">{note.content}</p>
                    </div>
                </div>
            );
        } else {
            return (
                <div>loading...</div>
            );
        }
        // const note = this.context.notes.find(note => note.id === this.props.match.params.noteId);
        // const folder = this.context.folders.find(folder => folder.id === note.folderId);
        // console.log(`Note Detail Props`, this.props);
    }
}

export default NoteDetail;