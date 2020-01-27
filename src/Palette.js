import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';

import './Palette.css';


class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { colorScale: 500 }
  }

  renderColorBoxes = ()=>{
    return this.props.palette.colors[this.state.colorScale].map(c => <ColorBox {...c}/>)
  }

  handleSliderChange = (newScale) => this.setState({ colorScale: newScale}) 

  render() { 
    return ( 
      <div className="Palette">
        <div style={{margin: '1rem 2rem', width: '300px'}}>
          <Slider defaultValue={this.state.colorScale} min={100} max={900} step={100} onChange={this.handleSliderChange} />
        </div>
        <div className="Palette-colors">
          {this.renderColorBoxes()}
        </div>
      </div>
     );
  }
}
 
export default Palette;