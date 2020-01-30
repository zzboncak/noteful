import React from 'react';
import NoteContext from '../NoteContext';
import PropTypes from 'prop-types';
import { API_ENDPOINT } from '../config';

class AddFolder extends React.Component {
    state = {
        name: "",
        isTouched: false
    }

    static contextType = NoteContext;

    handleSubmitAddFolder = (e) => {
        //this function will make a post call to add a folder
        e.preventDefault();
        let newFolder = {
            folder_name: this.state.name
        };

        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newFolder)
        }
        fetch(`${API_ENDPOINT}/folders`, options)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Failed to add folder`);
                }
                return res.json()
            })
            .then(data => {
                this.props.addNewFolder(data);
                this.props.toggleFolderFormView();
            })
            .catch(error => console.log(error));
    }
    
    onNameChange = (value) => {
        this.setState({
            name: value,
            isTouched: true
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
                {this.state.isTouched && <p className="folder-error">{this.validateFolderName()}</p>}
            </div>
        );
    }
}

AddFolder.propTypes = {
    addNewFolder: PropTypes.func.isRequired,
    toggleFolderFormView: PropTypes.func.isRequired
}

export default AddFolder;