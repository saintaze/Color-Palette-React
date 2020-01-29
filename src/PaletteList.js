import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  renderPaletteList = () => {
    return this.props.seedColors.map(p => <Link to={'palette/' + p.id} >{p.paletteName}</Link>)
  }


  render() { 
    return ( 
      <div className="PaletteList">
        <h1>he</h1>
        {this.renderPaletteList()}
      </div>
     );
  }
}
 
export default PaletteList;