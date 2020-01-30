import React from 'react';

const Footer = props => {
  const {paletteName, emoji} = props
  return (
    <footer className="Palette-footer">
      {paletteName}
      <span className="emoji">{emoji}</span>
    </footer>
  );
}

export default Footer