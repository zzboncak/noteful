import React from 'react';
import NoteContext from '../NoteContext';

class AddFolder extends React.Component {
    state = {
        name: ""
    }

    static contextType = NoteContext;
    
    handleSubmitAddFolder = (e) => {
        //this function will make a post call to add a folder
        e.preventDefault();
        console.log('you tried to add a folder!');
    }
    
    onNameChange = (value) => {
        this.setState({
            name: value
        });
    }

    validateFolderName() {
        const folderName = this.state.name;
        if(folderName.length < 1) {
            return "You must enter a folder name";
        }
    }

    render() {        
        return (
            <div className="add-folder-form">
                <form onSubmit={e => this.handleSubmitAddFolder(e)}>
                    <label htmlFor="add-folder">Folder name: </label>
                    <input type="text" placeholder="name of folder" name="add-folder" value={this.state.name} onChange={e => this.onNameChange(e.target.value)} />
                    <button type="submit" disabled={this.validateFolderName()}>Add this folder</button>
                </form>
                <button onClick={this.context.toggleFolderFormView}>Go Back</button>
                <p className="folder-error">{this.validateFolderName()}</p>
            </div>
        );
    }
}

export default AddFolder;