import React, { Component } from 'react';
import Slider from 'rc-slider/lib/Slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import 'rc-slider/assets/index.css';
import 'emoji-mart/css/emoji-mart.css';
import './Navbar.css';
import media from './mediaQueries';

const styles =  {
  logo: {
    backgroundColor: '#eceff1',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Roboto',
    marginRight: '15px',
    fontSize: '22px',
    padding: '0 13px',
    [media('sm')]: {
      display: 'none'
    }
  }
}

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { format: 'hex', showSnackbar: false }
  }

  handleSnackbarClose = () => this.setState({showSnackbar: false});

  handleFormatChange = (e) => {
    const newFormat = e.target.value
    this.setState({ format: newFormat, showSnackbar: true });
    this.props.formatChange(newFormat);
    setTimeout(() => this.setState({ showSnackbar: false }), 2500)
  }

  renderSlider = ( ) => {
    return this.props.showSlider && (
      <div className='slider-container'>
        <span>Level: {this.props.colorScale}</span>
        <div className='slider'>
          <Slider
            defaultValue={this.props.colorScale}
            min={100}
            max={900}
            step={100}
            onChange={this.props.handleSliderChange}
          />
        </div>
      </div>
    );
  }

  render() { 
    return ( 
      <nav className="Navbar">
        <div className={this.props.classes.logo}>
          <Link to="/">colorpinetta</Link>
        </div>
        {this.renderSlider()}
        <div className='select-container'>
          <Select value={this.state.format} onChange={this.handleFormatChange}>
            <MenuItem value='hex'>Hex - #ffffff</MenuItem>
            <MenuItem value='rgb'>RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value='rgba'>RGBA - rgba(255,255,255,1.0)</MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.showSnackbar}
          autoHideDuration={3000}
          message={`Format Changed to ${this.state.format.toUpperCase()}`} 
          action={
            <IconButton size="small" color="inherit" onClick={this.handleSnackbarClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </nav> 
    );
  }


}
 
export default withStyles(styles)(Navbar);