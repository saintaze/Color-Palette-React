import React, { Component } from 'react';
import ColorBox from './ColorBox';

import './Palette.css';


class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  renderColorBoxes = ()=>{
    return this.props.colors.map(c => <ColorBox {...c}/>)
  }

  render() { 
    return ( 
      <div className="Palette">
        <div className="Palette-colors">
          {this.renderColorBoxes()}
        </div>
      </div>
     );
  }
}
 
export default Palette;