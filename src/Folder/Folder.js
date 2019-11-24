import React from 'react';
import { Link } from 'react-router-dom';
import './Folder.css';
import NoteContext from '../NoteContext';

class Folder extends React.Component {
    static contextType = NoteContext;

    render() {
        return (
            <div className={`folder ${this.props.className}`}>
                <Link style={{ textDecoration: 'none' }} to={`/folder/${this.props.folderId}`}>
                    <h3 className="folder-name" onClick={() => this.context.updateFolderId(this.props.folderId)}>Folder {this.props.name}</h3>
                </Link>
            </div>
        )
    }
}

export default Folder;