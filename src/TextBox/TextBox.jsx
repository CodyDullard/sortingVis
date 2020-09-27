import React from 'react';
import './TextBox.css';

export default class TextBox extends React.Component {
    state = {
      text: 'something'
    }
  
    onClickButton1 = () => {
      this.setState({
        text: 'clicked 1'
      });
    }
  
    onClickButton2 = () => {
      this.setState({
        text: 'clicked 2'
      });
    }
  
    // etc...
  
    render() {
      return (
        <div>
          <button onClick={this.onClickButton1}>
            Button 1
          </button>
          <button onClick={this.onClickButton2}>
            Button 2
          </button>
          <h1>{this.state.text}</h1>
        </div>
      );
    }
  }