import React from 'react';
import Folder from '../Folder/Folder';
import './Sidebar.css';
import NoteContext from '../NoteContext';

class Sidebar extends React.Component {
    static contextType = NoteContext;
    
    render() {
        //console.log(`Context in Sidebar`, this.context);
        const folders = this.context.folders.map((folder, i) => {
            return (
                <Folder name={folder.name} key={i} folderId={folder.id} className={(this.context.currentFolderId === folder.id) ? "selected-folder" : ""} />
            );
        });
        
        return (
            <div className="folders-list">
                {folders}
                <button className="add-folder-button" type="button">Add a folder</button>
            </div>
        )
    }
}

export default Sidebar;