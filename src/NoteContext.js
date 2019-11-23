import React from 'react';

const NoteContext = React.createContext({
    notes: [],
    folders: [],
    handleDelete: () => {},
    updateFolderId: () => {},
    currentFolderId: null
});

export default NoteContext;