import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';

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
        <Navbar colorScale={this.state.colorScale} handleSliderChange={this.handleSliderChange}/>
        <div className="Palette-colors">
          {this.renderColorBoxes()}
        </div>
        
      </div>
     );
  }
}
 
export default Palette;