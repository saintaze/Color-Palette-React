import React, { Component } from 'react';
import Palette from './Palette';
import {Route, Switch} from 'react-router-dom';

import seedColors from './seedColors';
import {generatePalette} from './colorHelpers';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
// import './App.css';


class App extends Component{

  renderPalette = id => { 
    const palette = seedColors.find(p => p.id === id);
    return generatePalette(palette)
  }

  render () {
    return (
      <Switch >
        <Route 
          exact 
          path='/' 
          render={(routeProps)=> <PaletteList seedColors={seedColors} {...routeProps}/>}/>
        <Route 
          exact 
          path='/palette/:id' 
          render={(routeProps) => <Palette palette={this.renderPalette(routeProps.match.params.id)} />}/>
        <Route 
          exact 
          path='/palette/:paletteId/:colorId' 
          render={(routeProps) => <SingleColorPalette palette={this.renderPalette(routeProps.match.params.paletteId)} colorId={routeProps.match.params.colorId} />}/>
      </Switch>
    );
  }
}

export default App;
