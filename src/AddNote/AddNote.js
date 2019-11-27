import React from 'react';
import NoteContext from '../NoteContext';

class AddNote extends React.Component {
    state = {
        name: ""
    }

    static contextType = NoteContext;
    
    handleSubmitAddNote = (e) => {
        //this function will make a post call to add a folder
        e.preventDefault();
        console.log('you tried to add a Note!');
    }
    
    onNameChange = (value) => {
        this.setState({
            name: value
        });
    }

    validateNoteName() {
        const noteName = this.state.name;
        if(noteName.length < 1){
            return "You must enter a name";
        }
    }

    render() {
        const folderNames = this.context.folders.map((folder, i) => {
            return (
                <option key={i} value={folder.id}>{folder.name}</option>
            );
        });
        
        return (
            <div className="add-note-form">
                <form onSubmit={e => this.handleSubmitAddNote(e)}>
                    <label htmlFor="add-note">Note name: </label>
                    <input type="text" placeholder="name of note" name="add-note" value={this.state.name} onChange={e => this.onNameChange(e.target.value)} />

                    <label htmlFor="folders">Which Folder?</label>
                    <select name="folders">
                        {folderNames}
                    </select>
                    <button type="submit" disabled={this.validateNoteName()}>Add this note</button>
                </form>
                <button onClick={this.context.toggleNoteFormView}>Go Back</button>
            <p className="note-error">{this.validateNoteName()}</p>
            </div>
        );
    }
}

export default AddNote;