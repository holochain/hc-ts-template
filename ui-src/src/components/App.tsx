import * as React from 'react';
import * as redux from 'redux';
import {BrowserRouter, Route} from 'react-router-dom'
import {connect} from 'react-redux';

import './App.css';

import store from '../store'
import {Hello, ReduxAction} from '../../../types';


type AppProps = {
  numClicks: number,
  decrement: () => void,
  increment: () => void,
}

class App extends React.Component<AppProps, {}> {
  public render() {
    const greeting: Hello = "Welcome to your brand new Typescript-enabled React+Redux app";
    return (
      <div style={{textAlign: 'center'}}>
        <img src="/holo-logo.png" />
        <p>{ greeting }</p>
        <h1>{ this.props.numClicks }</h1>
        <div>
          <button onClick={ this.props.decrement }> - </button>
          <button onClick={ this.props.increment }> + </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({numClicks: state.numClicks})
const mapDispatchToProps = dispatch => ({
  increment: () => dispatch({type: 'INCREMENT'}),
  decrement: () => dispatch({type: 'DECREMENT'}),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
