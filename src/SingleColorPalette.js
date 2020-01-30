import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import Footer from './Footer';

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
      <ColorBox background={c[this.state.format]} name={c.name} key={c.name} showMoreLink={false}/>
    );
  } 

  render(){
    return (
      <div className='Palette'>
        <Navbar showSlider={false} formatChange={this.formatChange}/>
        <div className='Palette-colors'>
          {this.renderColorBoxes()}
        </div>
        <Footer emoji={this.props.palette.emoji} paletteName={this.props.palette.paletteName} />
      </div>
    )
  }
} 

export default SigleColorPalette;