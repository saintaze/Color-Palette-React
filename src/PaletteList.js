import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import MiniPalette from './MiniPalette';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { red, blue } from '@material-ui/core/colors';
import media from './mediaQueries';
import bg from './bg.svg';

const styles = {
  '@global': {
    '.fade-exit': {
      opacity: '1'
    },
    '.fade-exit-active': {
      opacity: '0',
      transition: 'opacity .5s ease-out'
    }
  },
  root: {
    backgroundColor: '#394bad',
    backgroundImage: `url(${bg})`, 
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: '3rem'
  },
  container: {
    width: '70%'
  },
  nav: {
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& a': {
      color: 'white'
    }
  },
  title: {
    fontSize: '2rem'
  },
  palettes:{
    boxSizing: 'border-box',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '2.5rem',
    [media('md')]: {
      gridTemplateColumns: 'repeat(2, 50%)',
      gridGap: '1.8rem',
    },
    [media('xs')]: {
      gridTemplateColumns: 'repeat(1, 100%)',
      gridGap: '1.3rem',
    },
  }
};

class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = { showDeleteDialog: false, deletePaletteId: null }
  }

  handlePaletteClick = (id) => this.props.history.push(`/palette/${id}`)

  closeDeleteDialog = () => {
    this.setState({ showDeleteDialog: false, deletePaletteId: null});
  }

  openDeleteDialog = (deleteId) => {
    this.setState({ showDeleteDialog: true, deletePaletteId: deleteId});
  }

  handleDelete = ( ) => {
    console.log('wq')
    this.props.deletePalette(this.state.deletePaletteId)
    this.closeDeleteDialog()
  }

  renderPaletteList = () => {
    return this.props.seedColors.map(p => 
      <CSSTransition
        key={p.paletteName}
        timeout={500}
        classNames="fade"
      > 
        <MiniPalette 
          {...p} 
          key={p.paletteName} 
          onPaletteClick={() => this.handlePaletteClick(p.id)} 
          openDeleteDialog={this.openDeleteDialog}
          palettesCount={this.props.seedColors.length} 
          />
      </CSSTransition>
    )
  }

  render() { 
    const {classes} = this.props;
    return ( 
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1 className={classes.title}>Colors Pinetta</h1>
            <Link to='/palette/new'>Create Palette</Link>
          </nav>
            <TransitionGroup className={classes.palettes}>
             {this.renderPaletteList()}
            </TransitionGroup>
        </div>
        <Dialog open={this.state.showDeleteDialog} onClose={this.closeDeleteDialog}>
          <DialogTitle>Delete This Plalette?</DialogTitle>
          <List>
            
              <ListItem button onClick={this.handleDelete}>
                <ListItemAvatar>
                  <Avatar style={{backgroundColor: blue[100], color: blue[600]}}>
                    <CheckIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText  primary="Delete"/>
              </ListItem>
            
            <ListItem autoFocus button onClick={this.closeDeleteDialog}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Cancel" />
            </ListItem>
          </List>
        </Dialog>
      </div>
     );
  }
}
 
export default withStyles(styles)(PaletteList);
