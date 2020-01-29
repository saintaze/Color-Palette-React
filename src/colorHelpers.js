import chroma from 'chroma-js';
const colorLevels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function generatePalette(starterPalette){
  let newPalette = {
    ...starterPalette,
    colors: {}
  }
  colorLevels.forEach(l => newPalette.colors[l] = [])
  starterPalette.colors.forEach(c => {
    const colorStops = generateScale(c.color, 10).reverse();
    colorStops.forEach((colorStop, i) => {
      const propName = colorLevels[i];
      newPalette.colors[propName].push({
        name: `${c.name} ${propName}`,
        id: c.name.toLowerCase().replace(/ /g, '-'),
        hex: colorStop,
        rgb: chroma(colorStop).css(),
        rgba: chroma(colorStop).css().replace('rgb', 'rgba').replace(')', ',1.0)')
      });
    });
  });
  return newPalette;
}


function generateScale(hexColor, numOfColors){
  const darkenedColor = chroma(hexColor).darken(1.4).hex();
  return chroma.scale([darkenedColor ,hexColor, 'white']).mode('lab').colors(numOfColors);
}

export { generatePalette };