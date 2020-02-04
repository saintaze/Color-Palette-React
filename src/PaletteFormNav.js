import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';


const styles = {
  root: {
    display: 'flex',
  },
  cToolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row'
  }
}

class PaletteFormNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      newPaletteName: ''
     }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  };

  componentDidMount = () =>{
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
      return this.props.palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
    });
  }

  render() { 
    const { classes: mClasses, open, handleSubmit, handleDrawerOpen} = this.props;
    const {newPaletteName} = this.state;

    return ( 
      <div>
        <CssBaseline />
        <AppBar
          color='default'
          position="fixed"
          className={clsx(mClasses.appBar, {
            [mClasses.appBarShift]: open,
          })}
        >
          <Toolbar className={this.props.classes.cToolbar}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(mClasses.menuButton, open && mClasses.hide)}
            >
              <MenuIcon />
            </IconButton>
            <div className={mClasses.navBtns}>
              <ValidatorForm onSubmit={() => handleSubmit(newPaletteName) }>
                <TextValidator
                  label="Palette Name"
                  onChange={this.handleChange}
                  name="newPaletteName"
                  value={newPaletteName}
                  validators={['required', 'isPaletteNameUnique']}
                  errorMessages={['enter a color name', 'palette name already taken']}
                />
                <Button type="submit" variant='contained' color='primary'  disableElevation>Save Palette</Button>

                <Link to='/'>
                  <Button variant='contained' color='primary' disableElevation>Go Back</Button>
                </Link>
              </ValidatorForm>
            </div>
          </Toolbar>
        </AppBar>
      </div> 
    );
  }
}

export default withStyles(styles)(PaletteFormNav);
