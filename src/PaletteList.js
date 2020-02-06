import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import MiniPalette from './MiniPalette';
import media from './mediaQueries';
import bg from './bg.svg';

const styles = {
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
    this.state = {  }
  }

  handlePaletteClick = (id) => this.props.history.push(`/palette/${id}`)

  renderPaletteList = () => {
    return this.props.seedColors.map(p =>  
      <MiniPalette 
        {...p} 
        key={p.paletteName} 
        onPaletteClick={() => this.handlePaletteClick(p.id)} 
        deletePalette={this.props.deletePalette}
        palettesCount={this.props.seedColors.length} 
        />
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
          <div className={classes.palettes}>
            {this.renderPaletteList()}
          </div>
        </div>
      </div>
     );
  }
}
 
export default withStyles(styles)(PaletteList);
