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
    const savedPalettes = JSON.parse(localStorage.getItem('palettes'));
    this.state = { palettes: savedPalettes || seedColors}
  }

  renderPalette = id => { 
    const palette = this.state.palettes.find(p => p.id === id);
    return generatePalette(palette)
  }

  savePalette = (newPalette) => {
    this.setState({palettes: [...this.state.palettes, newPalette]}, this.syncLocalStorage)
  }

  deletePalette = (paletteId) => {
    if(this.state.palettes.length === 1) return;
    this.setState({
      palettes: this.state.palettes.filter(p => p.id !== paletteId)
    }, this.syncLocalStorage)
  }

  syncLocalStorage = () => {
    localStorage.setItem('palettes', JSON.stringify(this.state.palettes));
  }

  render () {
    return (
      <Switch >
        <Route 
          exact 
          path='/' 
          render={(routeProps)=> <PaletteList seedColors={this.state.palettes} {...routeProps} deletePalette={this.deletePalette} />}/>
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
