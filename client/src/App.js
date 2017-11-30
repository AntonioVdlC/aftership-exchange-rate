import React, { Component } from 'react';

import Footer from './components/Footer';
import Header from './components/Header';
import Loading from './components/Loading';
import Main from './components/Main';
import Select from './components/Select';
import Whisper from './components/Whisper';

import './App.css';

const getRate = async ({
  base,
  target,
  store,
  onLoading,
  onSuccess,
  onError,
  onFinally
}) => {
  onLoading();
  try {
    let rate = await store.get('rate', { base, target });
    onSuccess(rate.rate);
  } catch (err) {
    onError(err);
  } finally {
    onFinally();
  }
};

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

  componentDidMount = async () => {
    const { store } = this.props;

    try {
      let currencies = await store.get('currencies');
      this.setState(prev => ({ ...prev, currencies }));
    } catch (err) {
      this.setState(prev => ({ ...prev, error: true }));
    } finally {
      this.setState(prev => ({ ...prev, loading: false }));
    }
  };

  componentDidUpdate = (_, prevState) => {
    const { base, target } = this.state;
    const { store } = this.props;

    if (
      base &&
      target &&
      (base !== prevState.base || target !== prevState.target)
    ) {
      getRate({
        base,
        target,
        store,
        onLoading: () => {
          this.setState(prev => ({ ...prev, loadingRate: true, error: false }));
        },
        onSuccess: rate => {
          this.setState(prev => ({ ...prev, rate }));
        },
        onError: err => {
          this.setState(prev => ({ ...prev, error: true }));
        },
        onFinally: () => {
          this.setState(prev => ({ ...prev, loadingRate: false }));
        }
      });
    }
  };

  render() {
    const {
      loading,
      loadingRate,
      error,
      currencies,
      base,
      target,
      rate
    } = this.state;

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
              {loadingRate ? <Loading /> : rate ? <p>{rate}</p> : null}
            </div>
          )}
        </Main>
        <Footer>Made on a plane ✈ by Antonio Villagra De La Cruz</Footer>
      </div>
    );
  }
}

export default App;
