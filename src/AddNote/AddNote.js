import React from 'react';
import NoteContext from '../NoteContext';

class AddNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            selectedFolder: "",
            noteContent: ""
        }
    }

    static contextType = NoteContext;
    
    generateNoteId = () => {
        let noteId = Math.ceil(Math.random()*1000000);
        return noteId;
    }

    handleSubmitAddNote = (e) => {
        e.preventDefault();
        let newNote = {
            id: this.generateNoteId(),
            name: this.state.name,
            modified: new Date(),
            folderId: this.state.selectedFolder,
            content: this.state.noteContent
        };

        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newNote)
        }
        fetch('http://localhost:9090/notes', options)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Failed to add note`);
                }
                return res.json()
            })
            .then(data => {
                this.props.addNewNote(data);
                this.props.toggleNoteFormView();
            })
            .catch(error => console.log(error));
    }
    
    onNameChange = (value) => {
        this.setState({
            name: value
        });
    }

    onContentChange = (value) => {
        this.setState({
            noteContent: value
        });
    }

    onSelectedFolderChange = (event) => {
        this.setState({
            selectedFolder: event.target.value
        });
    }

    validateNoteName() {
        const noteName = this.state.name;
        if(noteName.length <1 && this.state.selectedFolder === "" && this.state.noteContent === "") {
            return "Please fill out this form";
        } else if(noteName.length < 1){
            return "You must enter a name";
        } else if (this.state.selectedFolder === "") {
            return "You must select a folder";
        } else if (this.state.noteContent === "") {
            return "Your note needs content";
        }
    }

    render() {
        console.log(this.state);
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
                    <br />

                    <label htmlFor="folders">Which Folder?</label>
                    <select name="folders" value={this.state.selectedFolder} onChange={this.onSelectedFolderChange}>
                        {folderNames}
                    </select>
                    <br />

                    <textarea id='note-content' value={this.state.noteContent} onChange={e => this.onContentChange(e.target.value)}></textarea>
                    <br />

                    <button type="submit" disabled={this.validateNoteName()}>Add this note</button>
                </form>
                <button onClick={this.context.toggleNoteFormView}>Go Back</button>
            <p className="note-error">{this.validateNoteName()}</p>
            </div>
        );
    }
}

export default AddNote;