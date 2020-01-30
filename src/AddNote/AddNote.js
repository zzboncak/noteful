import React from 'react';
import NoteContext from '../NoteContext';
import PropTypes from 'prop-types';
import { API_ENDPOINT } from '../config';

class AddNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: "",
                isTouched: false
            },
            selectedFolder: {
                value: "",
                isTouched: false
            },
            noteContent: {
                value: "",
                isTouched: false
            },
        }
    }

    static contextType = NoteContext;
    

    handleSubmitAddNote = (e) => {
        e.preventDefault();
        let newNote = {
            note_name: this.state.name.value,
            modified: new Date(),
            folder_id: this.state.selectedFolder.value,
            note_content: this.state.noteContent.value
        };

        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newNote)
        }
        fetch(`${API_ENDPOINT}/notes`, options)
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
    
    onNameChange = (newName) => {
        this.setState({
            name: { value: newName, isTouched: true }
        });
    }

    onContentChange = (newContent) => {
        this.setState({
            noteContent: { value: newContent, isTouched: true }
        });
    }

    onSelectedFolderChange = (event) => {
        this.setState({
            selectedFolder: { value: event.target.value, isTouched: true }
        });
    }

    validateNoteName() {
        if(this.state.name.value.length < 1){
            return "You must enter a name";
        }
    }

    validateFolderChoice() {
        if (this.state.selectedFolder.value === "default") {
            return "Please choose a real folder";
        } else if (this.state.selectedFolder.value === "") {
            return "You must select a folder";
        }
    }

    validateNoteContent() {
        if (this.state.noteContent.value === "") {
            return "Your note needs content";
        }
    }

    render() {
        const folderNames = this.context.folders.map((folder, i) => {
            return (
                <option key={i} value={folder.id}>{folder.folder_name}</option>
            );
        });

        const nameError = this.validateNoteName();
        const folderError = this.validateFolderChoice();
        const contentError = this.validateNoteContent();
        
        return (
            <div className="add-note-form">
                <form onSubmit={e => this.handleSubmitAddNote(e)}>
                    <label htmlFor="add-note">Note name: </label>
                    <input 
                        type="text" 
                        placeholder="name of note" 
                        name="add-note" 
                        value={this.state.name.value} 
                        onChange={e => this.onNameChange(e.target.value)} 
                    />
                    <br />
                    {this.state.name.isTouched && nameError}
                    <br />

                    <label htmlFor="folders">Which Folder? </label>
                    <select name="folders" value={this.state.selectedFolder.value} onChange={this.onSelectedFolderChange}>
                        <option value="default">Please select a folder...</option>
                        {folderNames}
                    </select>
                    <br />
                    {this.state.selectedFolder.isTouched && folderError}
                    <br />

                    <label htmlFor='note-content'>Note Content: </label>
                    <textarea 
                        name='note-content' 
                        id='note-content' 
                        value={this.state.noteContent.value} 
                        onChange={e => this.onContentChange(e.target.value)} 
                    />
                    <br />
                    {this.state.noteContent.isTouched && contentError}
                    <br />

                    <button 
                        type="submit" 
                        disabled={
                            this.validateNoteName() ||
                            this.validateFolderChoice() ||
                            this.validateNoteContent()
                    }>
                        Add this note
                    </button>
                </form>
                <button onClick={this.context.toggleNoteFormView}>Go Back</button>
            </div>
        );
    }
}

AddNote.propTypes ={
    addNewNote: PropTypes.func.isRequired,
    toggleNoteFormView: PropTypes.func.isRequired
}

export default AddNote;