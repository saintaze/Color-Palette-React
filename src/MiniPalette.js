import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    backgroundColor: 'white',
    borderRadius: '5px',
    padding: '.5rem',
    overflow: 'hidden',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  colors: {
    backgroundColor: '#dae1e4',
    borderRadius: '5px',
    height: '150px',
    overflow: 'hidden',
    // marginBottom: '-9px'
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0',
    color: 'black',
    paddingTop: '.5rem',
    fontSize: '1rem',
    position: 'relative'
  },
  emoji: {
    marginLeft: '.5rem',
    fontSize: '1.5rem'
  },
  miniColorBox: {
    height: '25%',
    width: '20%',
    display: 'inline-block',
    marginBottom: '-3.5px'
  }
};



const MiniPalette = props => {
  const{classes, paletteName, emoji, colors} = props;
  
  const renderMiniColorBoxes = () => {
    return colors.map(c => 
      <div className={classes.miniColorBox} style={{backgroundColor: c.color}} key={c.name}></div>
    )
  }
  return (
    <div className={classes.root}>
      <div className={classes.colors}>
        {renderMiniColorBoxes()}
      </div>
      <h5 className={classes.title}>{paletteName} <span className={classes.emoji}>{emoji}</span></h5>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);