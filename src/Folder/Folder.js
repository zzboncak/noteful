import React from 'react';
import { Link } from 'react-router-dom';
import './Folder.css';

class Folder extends React.Component {
    render() {
        return (
            <div className='folder'>
                <Link to={`/folder/${this.props.folderId}`}>
                    <h3>Folder {this.props.name}</h3>
                </Link>
            </div>
        )
    }
}

export default Folder;