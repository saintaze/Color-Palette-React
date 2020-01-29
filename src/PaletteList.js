import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';

class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  renderPaletteList = () => {
    return this.props.seedColors.map(p => <MiniPalette {...p}/> )
  }


  render() { 
    return ( 
      <div className="PaletteList">
        {this.renderPaletteList()}
      </div>
     );
  }
}
 
export default PaletteList;