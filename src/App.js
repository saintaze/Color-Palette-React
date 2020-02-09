import React, { Component } from 'react';
import Palette from './Palette';
import {Route, Switch, Router, Redirect} from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import seedColors from './seedColors';
import {generatePalette} from './colorHelpers';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import Page from './Page';
import './App.css';


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
      <Route render={({location}) => (
        <TransitionGroup>
          <CSSTransition key={location.key} timeout={300} classNames='page'>
            <Switch location={location}>
              <Route
                exact
                path='/'
                render={(routeProps) => 
                  <Page>
                    <PaletteList
                      seedColors={this.state.palettes}
                      {...routeProps}
                      deletePalette={this.deletePalette}
                    />
                  </Page>
                }/>
              <Route
                exact
                path='/palette/new'
                render={(routeProps) => 
                  <Page>
                    <NewPaletteForm
                      savePalette={this.savePalette}
                      palettes={this.state.palettes}
                      {...routeProps} />
                  </Page>
                }/>
              <Route
                exact
                path='/palette/:id'
                render={(routeProps) => 
                  <Page>
                    <Palette 
                      palette={this.renderPalette(routeProps.match.params.id)} />
                  </Page>
                }/>
              <Route
                exact
                path='/palette/:paletteId/:colorId'
                render={(routeProps) => 
                  <Page>
                    <SingleColorPalette 
                     palette={this.renderPalette(routeProps.match.params.paletteId)} 
                     colorId={routeProps.match.params.colorId} />
                  </Page>
                } />
              <Route
                render={(routeProps) =>
                  <Page>
                    <PaletteList
                      seedColors={this.state.palettes}
                      {...routeProps}
                      deletePalette={this.deletePalette}
                    />
                  </Page>
                } />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )} />
    );
  }
}

export default App;
