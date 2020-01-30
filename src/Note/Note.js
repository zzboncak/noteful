import React from 'react';
import { Link } from 'react-router-dom';
import './Note.css';
import NoteContext from '../NoteContext';
import PropTypes from 'prop-types';
import { API_ENDPOINT } from '../config';

class Note extends React.Component {
    static contextType = NoteContext;
    
    requestDelete = (noteId, callback, isNoteDetail) => {
        fetch(`${API_ENDPOINT}/notes/${noteId}`, {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json'
          },
        })
        .then(res => {
          if(!res.ok) {
            return res.json().then(error => {
              throw error
            })
          }
        })
        .then(() => {
          if(isNoteDetail){
            this.props.history.push('/');
          }
          callback(noteId);
        })
        .catch(err => {
          console.log(err);
        });
    }

    render() {
        const d = new Date(this.props.modified);
        const day = d.getDay();
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const month = months[d.getMonth()];
        const year = d.getFullYear();

        return (
            <div className="note">
                <Link to={`/note/${this.props.id}`} style={{ textDecoration: 'none' }}>
                    <h2 className="note-title" onClick={() => this.context.updateNoteId(this.props.id)}>{this.props.name}</h2>
                </Link>
                <p className="modified-text">Date modified: {month} {day}, {year}</p>
                <button className="delete-button" onClick={() => this.requestDelete(this.props.id, this.context.handleDelete, this.props.isNoteDetail)}>Delete Note</button>
            </div>
        )
    }
}

Note.propTypes = {
  isNoteDetail: PropTypes.bool,
  name: PropTypes.string.isRequired,
  modified: PropTypes.string,
  id: PropTypes.string.isRequired
}

export default Note;