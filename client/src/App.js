import React, { Component } from 'react';

import Footer from './components/Footer';
import Header from './components/Header';
import Loading from './components/Loading';
import Main from './components/Main';
import Select from './components/Select';
import Whisper from './components/Whisper';

import './App.css';

class App extends Component {
  state = {
    loading: true,
    error: false,
    base: '',
    target: '',
    currencies: []
  };

  handleSelect = input => value => {
    this.setState(prev => ({ ...prev, [input]: value }));
  };

  componentDidMount = () => {
    try {
      let currencies = [
        { symbol: 'EUR', name: 'Euro' },
        { symbol: 'USD', name: 'US Dollar' }
      ];
      this.setState(prev => ({ ...prev, currencies }));
    } catch (err) {
      this.setState(prev => ({ ...prev, error: true }));
    } finally {
      this.setState(prev => ({ ...prev, loading: false }));
    }
  };

  render() {
    const { loading, error, currencies, base, target } = this.state;

    return (
      <div className="app">
        <Header>AfterShip Exchange Rate</Header>
        <Whisper
          display={error}
          type="error"
          text="Oops, seems like something went wrong ... Please try again!"
        />
        <Main>
          {loading ? (
            <Loading />
          ) : (
            <div>
              <p>Please select a base and a target currency!</p>
              <Select
                label="Select a base currency:"
                selected={base}
                onSelect={this.handleSelect('base')}
                elements={currencies.filter(
                  currency => currency.symbol !== target
                )}
              />
              <Select
                label="Select a target currency:"
                selected={target}
                onSelect={this.handleSelect('target')}
                elements={currencies.filter(
                  currency => currency.symbol !== base
                )}
              />
            </div>
          )}
        </Main>
        <Footer>Made on a plane ✈ by Antonio Villagra De La Cruz</Footer>
      </div>
    );
  }
}

export default App;
