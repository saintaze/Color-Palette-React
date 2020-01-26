import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import './ColorBox.css';

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    const {color, name} = this.props;
    return ( 
      <CopyToClipboard text={color}>
        <div style={{backgroundColor: color}} className="ColorBox">
          <button className="copy-button">copy</button>
          <div className="content-box">
            <div className="name">{name}</div>
            <button className="see-more">more</button>
          </div>
        </div>
      </CopyToClipboard>
     );
  }
}

export default ColorBox;