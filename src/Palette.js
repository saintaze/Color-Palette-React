import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import Footer from './Footer';


import './Palette.css';


class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { colorScale: 500, format: 'hex' }
  }

  renderColorBoxes = () => {
    const {colorScale, format} = this.state;
    const {palette} = this.props;
    return palette.colors[colorScale].map(c => 
      <ColorBox 
        background={c[format]} 
        name={c.name} key={c.id} 
        seeMoreUrl={`/palette/${palette.id}/${c.id}`}
        showingFullPalette
      />
    )
  }

  sliderChange = (newScale) => this.setState({ colorScale: newScale}) 

  formatChange = (newFormat) => this.setState({ format: newFormat }); 


  render() { 
    return ( 
      <div className="Palette">
        <Navbar 
          colorScale={this.state.colorScale} 
          handleSliderChange={this.sliderChange}
          formatChange={this.formatChange}
          showSlider
          />
        <div className="Palette-colors">
          {this.renderColorBoxes()}
        </div>
        <Footer emoji={this.props.palette.emoji} paletteName={this.props.palette.paletteName}/>
      </div>
     );
  }
}
 
export default Palette;