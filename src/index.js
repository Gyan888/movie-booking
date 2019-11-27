import React from 'react';
import ReactDOM from 'react-dom';
import Main from './MovieBooking/Main';



class Root extends React.Component {
    render() {
        return (
            <Main />
        );
    }
}

ReactDOM.render(<Root />, document.getElementById('app'));