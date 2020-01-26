import React, { Component } from 'react';
import Palette from './Palette';

import seedColors from './seedColors';
// import './App.css';


class App extends Component{
  render () {
    return (
      <Palette {...seedColors[4]} />
    );
  }
}

export default App;
