import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import Footer from './Footer';
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import media from './mediaQueries';

const styles = {
  goBackBox :{
    backgroundColor: 'black',
    [media('lg')]: {
      width: '25%',
      height: '33.3333% !important'
    },
    [media('md')]: {
      width: '50%',
      height: '20% !important'
    },
    [media('xs')]: {
      width: '100%',
      height: '10% !important'
    }
  }
}

class SigleColorPalette extends Component {
  constructor(props) {
    super(props);
    this._shades = this.gatherShades(this.props.palette, this.props.colorId);
    this.state = {format: 'hex'}
  }

  gatherShades = (palette, color) => {
    const allShades = []
    const allColors = palette.colors;
    for(let prop in allColors){
      const shade = allColors[prop].find(c => c.id === color);
      allShades.push(shade)
    }
    return allShades.slice(1)
  }

  formatChange = (newFormat) => this.setState({ format: newFormat });

  renderColorBoxes = () => {
    return this._shades.map(c => 
      <ColorBox background={c[this.state.format]} name={c.name} key={c.name} showingFullPalette={false}/>
    );
  } 

  render(){
    return (
      <div className='SingleColorPalette Palette'>
        <Navbar showSlider={false} formatChange={this.formatChange}/>
        <div className='Palette-colors'>
          {this.renderColorBoxes()}
          <div className={`ColorBox ${this.props.classes.goBackBox}` }>
            <Link to={`/palette/${this.props.palette.id}`}>
              <button className="go-back">Go Back</button>
            </Link>
          </div>
        </div>
        <Footer emoji={this.props.palette.emoji} paletteName={this.props.palette.paletteName} />
      </div>
    )
  }
} 

export default withStyles(styles)(SigleColorPalette);