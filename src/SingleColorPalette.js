import React, { Component } from 'react';
import ColorBox from './ColorBox';

class SigleColorPalette extends Component {
  constructor(props) {
    super(props);
    this._shades = this.gatherShades(this.props.palette, this.props.colorId)
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
  
  renderColorBoxes = () => {
    return this._shades.map(c => 
      <ColorBox background={c.hex} name={c.id} key={c.id} showMoreLink={false}/>
    )
  } 

  render(){
    return (
      <div className='Palette'>
        <h1>Hello Single Color Palette</h1>
        <div className='Palette-colors'>
          {this.renderColorBoxes()}
        </div>
      </div>
    )
  }
} 

export default SigleColorPalette;