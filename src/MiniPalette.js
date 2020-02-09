import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
  root: {
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: '5px',
    padding: '.5rem',
    overflow: 'hidden',
    cursor: 'pointer',
    '&:hover svg': {
      opacity: 1
    }
  },
  colors: {
    backgroundColor: '#dae1e4',
    borderRadius: '5px',
    height: '150px',
    overflow: 'hidden'
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
  },
  delete: {
  },
  deleteIcon: {
    fill: 'white',
    backgroundColor: '#eb3d30',
    width: '20px',
    height: '20px',
    position: 'absolute',
    right: 0,
    top: 0,
    padding: '10px',
    zIndex: '10',
    opacity: 0,
    transition: 'all .3s ease-in-out'
  }
};


const MiniPalette = props => {
  const{classes, paletteName, emoji, colors} = props;
  
  const renderMiniColorBoxes = () => {
    return colors.map(c => 
      <div className={classes.miniColorBox} style={{backgroundColor: c.color}} key={c.name}></div>
    )
  }

  const hanldeDeletePalette = (e) => {
    e.stopPropagation()
    props.openDeleteDialog(props.id)
  }
  
  return (
    <div className={classes.root} onClick={props.onPaletteClick}>
      <div className={classes.delete}>
        {props.palettesCount !== 1 && <DeleteIcon className={classes.deleteIcon} onClick={hanldeDeletePalette} />}
      </div>
      <div className={classes.colors}>
        {renderMiniColorBoxes()}
      </div>
      <h5 className={classes.title}>{paletteName} <span className={classes.emoji}>{emoji}</span></h5>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);