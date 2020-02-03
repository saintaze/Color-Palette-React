import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import DraggableColorList from './DraggableColorList';
import arrayMove from 'array-move';

const drawerWidth = 400;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      height: 'calc(100vh - 64px)',
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }),
);






export default function NewPaletteForm(props) {
  const maxColors = 20;
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState('teal');
  const [colors, setColors] = React.useState(props.palettes[0].colors);
  const [newColorName, setNewColorName] = React.useState('');
  const [newPaletteName, setNewPaletteName] = React.useState('');
  const [isValid, setIsValid] = React.useState(false);
  const paletteIsFull = colors.length >= maxColors;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const clearPalette = () => setColors([])
  const changeColor = (newColor) => setSelectedColor(newColor.hex);

  const addNewColor = () => {
    const newColor = {name: newColorName, color: selectedColor}
    setColors([...colors, newColor]);
    setNewColorName('')
  };

  const handleChange = (e) => {
    if(e.target.name === 'newColorName'){
      setNewColorName(e.target.value)
    } else if (e.target.name === 'newPaletteName'){
      setNewPaletteName(e.target.value)
    }
  };

  const handleSubmit = () => {
    const paletteName = newPaletteName;
    const newPalette = {
      id: paletteName.toLowerCase().replace(/ /g, '-'),
      paletteName,
      colors
    }
    props.savePalette(newPalette);
    props.history.push('/');
  }

  const handleRandomColor = () => {
    const allColors = props.palettes.map(p => p.colors).flat();
    const rand = Math.floor(Math.random() * allColors.length);
    setColors([...colors, allColors[rand]]);
   
  }

  const removeColor = (colorName) => {
    setColors(colors.filter(c =>  c.name !== colorName));
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors(arrayMove(colors, oldIndex, newIndex));
  };

  React.useEffect(() => {
    console.log('s')
    ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
      return colors.every(({name}) => name.toLowerCase() !== value.toLowerCase())
    });
    ValidatorForm.addValidationRule('isColorUnique', (value) => {
      return colors.every(({ color }) => color !== selectedColor)
    });
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
      return props.palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
    });
  }, [colors]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        color='default'
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <ValidatorForm onSubmit={handleSubmit}>
          <TextValidator
            label="Palette Name"
            onChange={handleChange}
            name="newPaletteName"
            value={newPaletteName}
            validators={['required', 'isPaletteNameUnique']}
            errorMessages={['enter a color name', 'palette name already taken']}
          />
          <Button type="submit" variant='contained' color='primary' onClick={handleSubmit} disableElevation>Save Palette</Button>
        </ValidatorForm>
      </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <Typography variant='h4'>Design Your Palette</Typography>
        <div>
          <Button onClick={clearPalette} variant='contained' color='secondary' disableElevation>Clear Palette</Button>
          <Button disabled={paletteIsFull} onClick={handleRandomColor} variant='contained' color='primary' disableElevation>Random Color</Button>
        </div>
        <ChromePicker color={selectedColor} onChange={changeColor}/>
        <ValidatorForm onSubmit={addNewColor} onError={errors => console.log(errors)}>
          <TextValidator
            label="Color Name"
            onChange={handleChange}
            name="newColorName"
            value={newColorName}
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={['enter a color name', 'color name should be unique', 'color already used']}
          />
          <Button disabled={paletteIsFull} type="submit" onClick={addNewColor} variant='contained' style={{ backgroundColor: paletteIsFull ? 'lightgrey' : selectedColor }} disableElevation>{paletteIsFull ? 'Palette Full' : 'Add Color'}</Button>
        </ValidatorForm>
        
      </Drawer>
      <main className={clsx(classes.content, {[classes.contentShift]: open})}>
        <div className={classes.drawerHeader} />
        <DraggableColorList onSortEnd={onSortEnd} colors={colors} removeColor={removeColor} axis='xy'/>
        
      </main>
  </div>
  );
}
