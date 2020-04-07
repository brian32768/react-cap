import React from 'react';  // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'
import './App.css'

// why no {} here??? oh Javascript how I love thee
import Home from './home'

const App = ({title}) => {
    return (
        <>
        <h1>{title}</h1>

        <Home/>
        </>
    );
}
App.propTypes = {
    "title": PropTypes.string.isRequired
};
export default App;
