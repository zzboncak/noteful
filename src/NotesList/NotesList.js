import React from 'react';
import Note from '../Note/Note';
import './NotesList.css';
import NoteContext from '../NoteContext';

class NotesList extends React.Component {
    static contextType = NoteContext;
    
    render() {
        const initialNotes = this.context.currentFolderId 
            ? this.context.notes.filter(note => note.folder_id == this.context.currentFolderId)
            : this.context.notes; 
        
        const notes = initialNotes.map((note, i) => {
            return (
                <Note name={note.note_name} modified={note.modified} id={note.id.toString()} key={i} isNoteDetail={false} />
            );
        });
        
        return (
            <div className="notes-container">
                {notes}
                <button className="add-note-button" type="button" onClick={this.context.toggleNoteFormView}>Add a note</button>
            </div>
        );
    }
}

export default NotesList;