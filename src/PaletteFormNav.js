import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import PaletteMetaForm from './PaletteMetaForm';
import Typography from '@material-ui/core/Typography';
import media from './mediaQueries';

const styles = {
  root: {
    display: 'flex',
  },
  cToolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    [media('xs')]: {
      padding: '0 8px',
    },
  },
  navBtns: {
    display: 'flex',
    alignItems: 'center',
    '& a': {
      textDecoration: "none"
    }
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  goBackBtn: {
    [media('xs')]: {
      padding: '0 6px',
      fontSize: '.8rem',
      lineHeight: '30px'
    },
  }
  
}

class PaletteFormNav extends React.Component {
  constructor(props) {
    super(props)
  }

  render() { 
    const { classes: mClasses, open, handleSubmit, handleDrawerOpen, palettes} = this.props;

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
            <div class={this.props.classes.titleContainer}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(mClasses.menuButton, open && mClasses.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant='h5'>Create A Palette</Typography>

            </div>
            <div className={mClasses.navBtns}>
              <PaletteMetaForm handleSubmit={handleSubmit} palettes={palettes}/>
              <Link to='/'>
                <Button  className={this.props.classes.goBackBtn} variant='contained' color='primary' disableElevation>Go Back</Button>
              </Link>
            </div>
          </Toolbar>
        </AppBar>
      </div> 
    );
  }
}

export default withStyles(styles)(PaletteFormNav);
