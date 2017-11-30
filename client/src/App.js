import React, { Component } from 'react';

import Footer from './components/Footer'
import Header from './components/Header'
import Main from './components/Main'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header>AfterShip Exchange Rate</Header>
        <Main>
          <p className="intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </Main>
        <Footer>Made on a plane ✈ by Antonio Villagra De La Cruz</Footer>
      </div>
    );
  }
}

export default App;
