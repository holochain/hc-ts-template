import * as React from 'react';
import * as redux from 'redux';
import {BrowserRouter, Route} from 'react-router-dom'
import {connect} from 'react-redux';

import './App.css';

import store from '../store'
import {fetchPOST} from '../helpers'
import {Hello, ReduxAction} from '../../../types';


type AppProps = {
  numClicks: number,
  texts: Array<string>,
  decrement: () => void,
  increment: () => void,
  fetchTexts: () => void,
}

class App extends React.Component<AppProps, {}> {

  private text = React.createRef<HTMLInputElement>();

  public render() {
    const greeting: Hello = "Welcome to your brand new Typescript-enabled React+Redux app";
    return (
      <div style={{textAlign: 'center'}}>
        <img src="/holo-logo.png" />
        <p>{ greeting }</p>
        <h1>{ this.props.numClicks }</h1>
        <div style={{margin: '20px auto'}}>
          <button onClick={ this.props.decrement }> - </button>
          <button onClick={ this.props.increment }> + </button>
        </div>
        <div style={{textAlign: 'left', margin: 'auto', display: 'inline-block'}}>
          <form onSubmit={this.handleSubmit}>
            <input type="text" ref={this.text} />
            <input type="submit" value="Say something"/>
          </form>
          <ul>
            { this.props.texts.map((text, i) => <li key={i}>{text}</li>) }
          </ul>
        </div>
      </div>
    );
  }

  public componentDidMount() {
    setInterval(this.props.fetchTexts, 1000)
  }

  private handleSubmit = e => {
    e.preventDefault()
    if (this.text.current) {
      fetchPOST('/fn/sampleZome/sampleEntryCreate', {
        text: this.text.current.value,
      }).then(() => this.text.current!.value = '')
    }
  }
}

const mapStateToProps = ({numClicks, texts}) => ({numClicks, texts})
const mapDispatchToProps = dispatch => ({
  increment: () => dispatch({type: 'INCREMENT'}),
  decrement: () => dispatch({type: 'DECREMENT'}),
  fetchTexts: () => {
    fetchPOST('/fn/sampleZome/sampleEntryList').then(entries => {
      dispatch({type: 'FETCH_TEXTS', entries})
    })
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
