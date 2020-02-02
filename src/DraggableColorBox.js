import React from 'react';
import {withStyles} from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
  root: {
    display: 'inline-block',
    width: '20%',
    height: '25%',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-3px',
    '&:hover svg': {
      color: 'white',
      transform: 'scale(1.2)',
      transition: 'all .3s ease-in-out'
    }
  },
  contentBox: {
    color: 'rgba(0,0,0,.5)',
    width: '100%',
    position: 'absolute',
    left: '0',
    bottom: '0',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    textTransform: 'uppercase',
    height: '34px',
    lineHeight: '34px',
    padding: '3px 7px'
  },
  deleteIcon: {
    width: '19px'
  }
}

const DraggableColorBox = (props) => {
  const {classes} = props;
  return (
    <div className={props.classes.root} style={{backgroundColor: props.color}}>
      <div className={classes.contentBox}>
        <span className={classes.colorName}>{props.name}</span>
        <span className={classes.deleteIcon} onClick={props.handleClick}><DeleteIcon /></span>
      </div>
    </div>
  );
}

export default withStyles(styles)(DraggableColorBox);