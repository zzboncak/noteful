import React from 'react';
import Note from '../Note/Note';
import './NotesList.css';
import NoteContext from '../NoteContext';

class NotesList extends React.Component {
    static contextType = NoteContext;
    
    render() {
        console.log('notes list context', this.context);
        const initialNotes = this.context.currentFolderId 
            ? this.context.notes.filter(note => note.folderId === this.context.currentFolderId)
            : this.context.notes; 
        
        const notes = initialNotes.map((note, i) => {
            return (
                <Note name={note.name} modified={note.modified} id={note.id} key={i} isNoteDetail={false} />
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