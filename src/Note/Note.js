import React from 'react';
import './Note.css';

class Note extends React.Component {
    render() {
        const d = new Date(this.props.modified);
        const day = d.getDay();
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const month = months[d.getMonth()];
        const year = d.getFullYear();

        
        return (
            <div className="note">
                <h2 className="note-title">Note {this.props.name}</h2>
                <p className="modified-text">Date modified: {month} {day}, {year}</p>
                <button className="delete-button">Delete Note</button>
            </div>
        )
    }
}

export default Note;