import React, { Component } from 'react';
import Palette from './Palette';
import {Route, Switch} from 'react-router-dom';

import seedColors from './seedColors';
import {generatePalette} from './colorHelpers';
import PaletteList from './PaletteList';
// import './App.css';


class App extends Component{

  renderPalette = routeProps => { 
    const paletteId = routeProps.match.params.id;
    const palette = seedColors.find(p => p.id === paletteId);
    return <Palette palette={generatePalette(palette)} />
  }

  render () {
    return (
      <Switch >
        <Route exact path='/' render={(routeProps)=> <PaletteList seedColors={seedColors} {...routeProps}/>}/>
        <Route exact path='/palette/:id' render={this.renderPalette}/>
        <Route exact path='/palette/:paletteId/:colorId' render={()=> <h1>Single Color Palette</h1>}/>
      </Switch>
    );
  }
}

export default App;
