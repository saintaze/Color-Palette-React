import React, { Component } from 'react';
import Palette from './Palette';
import {Route, Switch} from 'react-router-dom';

import seedColors from './seedColors';
import {generatePalette} from './colorHelpers';
// import './App.css';


class App extends Component{
  render () {
    return (
      <Switch >
        <Route exact path='/' render={()=> console.log('HOME')}/>
        <Route exact path='/palette/:id' render={(routeProps)=> console.log(`PALETTE ${routeProps.match.params.id}`)}/>
      </Switch>
      // <Palette palette={generatePalette(seedColors[7])} />
    );
  }
}

export default App;
