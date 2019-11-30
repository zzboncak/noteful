import React from 'react';

class AddFolderError extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if(this.state.hasError) {
            return (
                <h2>Something went wrong with the form. Our devs have been notified. For now, please use pen and paper!!</h2>
            );
        }
        return this.props.children;
    }
}

export default AddFolderError;