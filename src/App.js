import React, { Component } from 'react';
import Palette from './Palette';
import {Route, Switch} from 'react-router-dom';

import seedColors from './seedColors';
import {generatePalette} from './colorHelpers';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
// import './App.css';


class App extends Component{
  constructor(props){
    super(props)
    this.state = {palettes: seedColors}
  }

  renderPalette = id => { 
    const palette = this.state.palettes.find(p => p.id === id);
    console.log(generatePalette(palette))
    return generatePalette(palette)
  }

  savePalette = (newPalette) => {
    this.setState({palettes: [...this.state.palettes, newPalette]})
  }

  render () {
    return (
      <Switch >
        <Route 
          exact 
          path='/' 
          render={(routeProps)=> <PaletteList seedColors={this.state.palettes} {...routeProps}/>}/>
        <Route
          exact
          path='/palette/new'
          render={(routeProps) => <NewPaletteForm savePalette={this.savePalette} palettes={this.state.palettes} {...routeProps}/>} />
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
