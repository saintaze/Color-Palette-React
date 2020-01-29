import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import MiniPalette from './MiniPalette';

const styles = {
  root: {
    backgroundColor: 'skyblue',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center'
  },
  container: {
    width: '70%',
    // display: 'flex',
    // alignItems: 'flex-start',
    // flexDirection: 'column',
    // flexWrap: 'wrap'
  },
  nav: {
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    // width: '100%'
  },
  palettes:{
    boxSizing: 'border-box',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 30%)',
    gridGap: '5%'
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
      <MiniPalette {...p} key={p.paletteName} onPaletteClick={() => this.handlePaletteClick(p.id)} />
    )
  }


  render() { 
    const {classes} = this.props;
    return ( 
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>Colors Pinetta</h1>
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