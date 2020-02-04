import React from 'react';
import Button from '@material-ui/core/Button';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/styles';
import chroma from "chroma-js";

const styles = {
  root: {
    width: '100%'
  },
  picker: {
    width: '100% !important'
  },
  addColor: {
    width: '100%',
    padding: '1rem',
    marginTop: '1rem',
    fontSize: '1rem',
    boxSizing: 'border-box'
  },
  colorNameInput: {
    width: '100%'
  }
}

class ColorPickerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newColorName: '',
      selectedColor: 'teal'
    }
  } 

  componentDidMount() {
    ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
      return this.props.colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
    });
    ValidatorForm.addValidationRule('isColorUnique', (value) => {
      return this.props.colors.every(({ color }) => color !== this.state.selectedColor)
    });
  }

  changeColor = (newColor) => {
    this.setState({ selectedColor: newColor.hex});
  }

  handleSubmit = () => {
    const newColor = { name: this.state.newColorName, color: this.state.selectedColor }
    this.setState({newColorName: ''});
    this.props.addNewColor(newColor)
  }

  handleChange = (e) => {
    this.setState({ newColorName: e.target.value})
  };

  render(){
    const { paletteIsFull, classes } = this.props;
    const { newColorName, selectedColor } = this.state;
    const addBtnTextColor = chroma(selectedColor).luminance() >= .6 ? 'rgba(0, 0, 0, .65)' : 'white'
    return (
      <div className={classes.root}>
        <ChromePicker className={classes.picker} color={selectedColor} onChange={this.changeColor} />
        <ValidatorForm onSubmit={this.handleSubmit} onError={errors => console.log(errors)}>
          <TextValidator
          margin='normal'
            variant='filled'
            className={classes.colorNameInput}
            label="Color Name"
            onChange={this.handleChange}
            name="newColorName"
            value={newColorName}
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={['enter a color name', 'color name should be unique', 'color already used']}
          />
          <Button 
           
            className={classes.addColor}
            disabled={paletteIsFull} 
            type="submit" 
            onClick={this.handleSubmit} 
            variant='contained' 
            style={{ backgroundColor: paletteIsFull ? 'lightgrey' : selectedColor, color: addBtnTextColor }} disableElevation>
              {paletteIsFull ? 'Palette Full' : 'Add Color'}
            </Button>
        </ValidatorForm>
      </div>
    )
  }
}

export default withStyles(styles)(ColorPickerForm);
