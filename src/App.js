import React, { Component } from 'react';
import Palette from './Palette';

import seedColors from './seedColors';
import {generatePalette} from './colorHelpers';
// import './App.css';


class App extends Component{
  render () {
    return (
      <Palette palette={generatePalette(seedColors[7])} />
    );
  }
}

export default App;
