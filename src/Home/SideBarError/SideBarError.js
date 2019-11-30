import React from 'react';

class SideBarError extends React.Component {
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
                <h2>Your folders had trouble loading. We've been notified, but try refreshing the page.</h2>
            );
        }
        return this.props.children;
    }
}

export default SideBarError;