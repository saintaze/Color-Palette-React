import React, { Component } from 'react';

import './ColorBox.css';

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    const {color, name} = this.props;
    return ( 
      <div style={{backgroundColor: color}} className="ColorBox">
        <button className="copy-button">copy</button>
        <div className="content-box">
          <div className="name">{name}</div>
          <button className="see-more">more</button>
        </div>
      </div>
     );
  }
}
 
export default ColorBox;