import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../src/routes';
// import NavBar from './Components/wedgets/navbar';
// import Header from './Components/wedgets/Header';
import './index.css';
export const App = () => {

    return (
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    )

}

const search = (req,res)=> {}

ReactDOM.render(<App />, document.getElementById('root'));