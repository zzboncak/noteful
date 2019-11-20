import React from 'react';
import Folder from '../Folder/Folder';

class Sidebar extends React.Component {
    render() {
        console.log(`folders in Sidebar`, this.props.folders);
        const folders = this.props.folders.map((folder, i) => {
            return (
                <Folder name={folder.name} key={i} folderId={folder.id} />
            );
        });
        
        return (
            <div>
                {folders}
            </div>
        )
    }
}

export default Sidebar;