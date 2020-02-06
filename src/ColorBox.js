import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import chroma from "chroma-js";
import media from './mediaQueries';

import './ColorBox.css';

const styles = {
  ColorBox: {
    display: 'inline-block',
    width: '20%',
    height: props => props.showingFullPalette ? '25%' : '50%',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-3px',
    '&:hover button': {
      opacity: 1,
      transition: 'all .5s'
    },
    [media('lg')]: {
      width: '25%',
      height: props => props.showingFullPalette ? '20%' : '10%',
    },
    [media('md')]: {
      width: '50%',
      height: props => props.showingFullPalette ? '10%' : '10%',
    },
    [media('xs')]: {
      width: '100%',
      height: props => props.showingFullPalette ? '5%' : '10%',
    }
  },
  copyText: {
    color: props => chroma(props.background).luminance() >= .6 ? 'rgba(0, 0, 0, .6)' : 'white'
  },
  colorName: {
    padding: '10px',
    letterSpacing: '1px',
    color: props => chroma(props.background).luminance() <= .345 ? 'rgba(255, 255, 255, .8)' : 'black'
  },
  seeMore: {
    backgroundColor: 'rgba(255,255,255, .3)',
    border: 'none',
    outline: 'none',
    width: '60px',
    height: '35px',
    lineHeight: '35px',
    textTransform: 'inherit',
    cursor: 'pointer',
    color: props => chroma(props.background).luminance() >= .6 ? 'rgba(0, 0, 0, .8)' : 'white' 
  },
  copyButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(255,255,255, .3)',
    border: 'none',
    outline: 'none',
    width: '100px',
    height: '30px',
    lineHeight: '30px',
    fontSize: '1rem',
    textTransform: 'uppercase',
    cursor: 'pointer',
    opacity: '0',
    color: props => chroma(props.background).luminance() >= .6 ? 'rgba(0, 0, 0, .8)' : 'white' 
  }
}

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
    return this.props.showingFullPalette && (
      <Link to={this.props.seeMoreUrl} onClick={e => e.stopPropagation()}>
       <button className={this.props.classes.seeMore}>more</button>
      </Link>
    );
  }

  render() { 
    const {background, name, classes} = this.props;
    const {isCopied} = this.state;
  
    return ( 
      <CopyToClipboard text={background} onCopy={this.handleColorCopy}>
        <div style={{backgroundColor: background}} className={classes.ColorBox}>
          <div style={{ backgroundColor: background }} className={`copy-overlay ${isCopied && 'show'}`}></div>
          <div className={`copy-msg ${isCopied && 'show'}`}>
            <h1>copied!</h1>
            <div className={classes.copyText}>{background}</div>
          </div>
          <button className={classes.copyButton}>copy</button>
          <div className="content-box">
            <div className={classes.colorName}>{name}</div>
            {this.renderSeeMoreLink()}
          </div>
        </div>
      </CopyToClipboard>
     );
  }
}

export default withStyles(styles)(ColorBox);