import React from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class PaletteMetaForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false, newPaletteName: '' }
  }

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  };

  componentDidMount = () => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
      return this.props.palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
    });
  }

  render() { 
    const { open, newPaletteName } = this.state;
    const {handleSubmit} = this.props;
    return (
      <div>
        <Button style={{marginRight: '.5rem'}} variant="contained" color="secondary" onClick={this.handleClickOpen} disableElevation>
         Save
        </Button>
        <Dialog  style={{padding: '1rem'}} open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Choose a Palette name</DialogTitle>
          <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new beautiful palette. Make sure it's unqiue!
            </DialogContentText>
              <TextValidator
                fullWidth
                margin='normal'
                label="Palette Name"
                onChange={this.handleChange}
                name="newPaletteName"
                value={newPaletteName}
                validators={['required', 'isPaletteNameUnique']}
                errorMessages={['enter a color name', 'palette name already taken']}
              />
          </DialogContent>
          <DialogActions>
            <Button color='primary' onClick={this.handleClose}>Cancel</Button>
            <Button type="submit" variant='contained' color='primary' disableElevation>Save Palette</Button>
          </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    );
  }
}
 
export default PaletteMetaForm;