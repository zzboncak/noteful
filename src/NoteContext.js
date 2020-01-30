import React from 'react';

const NoteContext = React.createContext({
    notes: [],
    folders: [],
    handleDelete: () => {},
    updateFolderId: () => {},
    updateNoteId: () => {},
    currentFolderId: null,
    currentNoteId: null,
    toggleFolderFormView: () => {},
    toggleNoteFormView: () => {}
});

export default NoteContext;