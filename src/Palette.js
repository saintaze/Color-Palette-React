import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';


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
        showMoreLink
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
          />
        <div className="Palette-colors">
          {this.renderColorBoxes()}
        </div>
        <footer className="Palette-footer">
          {this.props.palette.paletteName}
          <span className="emoji">{this.props.palette.emoji}</span>
        </footer>
      </div>
     );
  }
}
 
export default Palette;