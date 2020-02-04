import React from 'react';
import Button from '@material-ui/core/Button';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

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
    const { paletteIsFull } = this.props;
    const { newColorName, selectedColor } = this.state;
    return (
      <div>
        <ChromePicker color={selectedColor} onChange={this.changeColor} />
        <ValidatorForm onSubmit={this.handleSubmit} onError={errors => console.log(errors)}>
          <TextValidator
            label="Color Name"
            onChange={this.handleChange}
            name="newColorName"
            value={newColorName}
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={['enter a color name', 'color name should be unique', 'color already used']}
          />
          <Button 
            disabled={paletteIsFull} 
            type="submit" 
            onClick={this.handleSubmit} 
            variant='contained' 
            style={{ backgroundColor: paletteIsFull ? 'lightgrey' : selectedColor }} disableElevation>
              {paletteIsFull ? 'Palette Full' : 'Add Color'}
            </Button>
        </ValidatorForm>
      </div>
    )
  }
}

export default ColorPickerForm;