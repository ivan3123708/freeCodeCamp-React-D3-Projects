import React, { Component } from 'react';
import marked from 'marked';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.takeInput = this.takeInput.bind(this);
    this.giveOutput = this.giveOutput.bind(this);
    this.state = {
      text: ''
    }
  }

  takeInput(event) {
    this.setState({text: event.target.value});
  }

  giveOutput() {
    const output = marked(this.state.text, {sanitize: true});
    return {__html: output};
  }

  render() {
    return (
      <div className="App">
        <header className="header">
          <h1>Markdown Previewer</h1>
        </header>
        <div className="wrapper">
          <div className="input">
            <textarea placeholder="Enter markdown text here" onChange={this.takeInput}/>
          </div>
          <div className="output" dangerouslySetInnerHTML={this.giveOutput()}/>
        </div>
      </div>
    );
  }
}

export default App;