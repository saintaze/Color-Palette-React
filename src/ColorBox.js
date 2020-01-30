import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import chroma from "chroma-js";

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

  renderSeeMoreLink = () => {
    const isLightColor = chroma(this.props.background).luminance() >= .6 //.7
    return this.props.showMoreLink && (
      <Link to={this.props.seeMoreUrl} onClick={e => e.stopPropagation()}>
       <button className={`see-more ${isLightColor && 'dark-text'}`}>more</button>
      </Link>
    );
  }

  render() { 
    const {background, name} = this.props;
    const {isCopied} = this.state;
    const isDarkColor = chroma(background).luminance() <= .345 //.05
    const isLightColor = chroma(this.props.background).luminance() >= .6 //.7
    
    return ( 
      <CopyToClipboard text={background} onCopy={this.handleColorCopy}>
        <div style={{backgroundColor: background}} className="ColorBox">
          <div style={{ backgroundColor: background }} className={`copy-overlay ${isCopied && 'show'}`}></div>
          <div className={`copy-msg ${isCopied && 'show'}`}>
            <h1>copied!</h1>
            <div className={isLightColor && 'dark-text'}>{background}</div>
          </div>
          <button className={`copy-button ${isLightColor && 'dark-text'}`}>copy</button>
          <div className="content-box">
            <div className={`name ${isDarkColor && 'light-text'}`}>{name}</div>
            {this.renderSeeMoreLink()}
          </div>
        </div>
      </CopyToClipboard>
     );
  }
}

export default ColorBox;