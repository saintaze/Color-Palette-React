import React from 'react';
import {withStyles} from '@material-ui/styles';

const styles = {
  root: {
    display: 'inline-block',
    width: '20%',
    height: '25%',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-3px'
  }
}

const DraggableColorBox = (props) => {
  return (
    <div className={props.classes.root} style={{backgroundColor: props.color}}>{props.name}</div>
  );
}

export default withStyles(styles)(DraggableColorBox);