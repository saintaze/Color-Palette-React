import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import './ColorBox.css';

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = { isCopied: false }
  }

  handleColorCopy = ()=>{
    this.setState({isCopied: true}, () => {
      setTimeout(() => this.setState({ isCopied: false }), 1500)
    })
  }

  render() { 
    const {background, name} = this.props;
    const {isCopied} = this.state;
    return ( 
      <CopyToClipboard text={background} onCopy={this.handleColorCopy}>
        <div style={{backgroundColor: background}} className="ColorBox">
          <div style={{ backgroundColor: background }} className={`copy-overlay ${isCopied && 'show'}`}></div>
          <div className={`copy-msg ${isCopied && 'show'}`}>
            <h1>copied!</h1>
            <div>{background}</div>
          </div>
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