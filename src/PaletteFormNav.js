import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import DraggableColorList from './DraggableColorList';
import arrayMove from 'array-move';
import { Link } from 'react-router-dom';

class PaletteFormNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      newPaletteName: ''
     }
  }

  handleChange = (e) => {
    if (e.target.name === 'newColorName') {
      // setNewColorName(e.target.value)
    } else if (e.target.name === 'newPaletteName') {
      this.setState({[e.target.name]: e.target.value})
    }
  };

  componentDidMount = () =>{
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
      return this.props.palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
    });
  }

  render() { 
    const { classes, open, handleSubmit, handleDrawerOpen} = this.props;
    const { newPaletteName } = this.state;
    return ( 
      <div>
        <CssBaseline />
        <AppBar
          color='default'
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <ValidatorForm onSubmit={() => handleSubmit(newPaletteName) }>
              <TextValidator
                label="Palette Name"
                onChange={this.handleChange}
                name="newPaletteName"
                value={newPaletteName}
                validators={['required', 'isPaletteNameUnique']}
                errorMessages={['enter a color name', 'palette name already taken']}
              />
              <Link to='/'>
                <Button variant='contained' color='primary' disableElevation>Go Back</Button>
              </Link>
              <Button type="submit" variant='contained' color='primary'  disableElevation>Save Palette</Button>
            </ValidatorForm>
          </Toolbar>
        </AppBar>
      </div> 
    );
  }
}
 
export default PaletteFormNav;