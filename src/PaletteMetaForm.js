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
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Open form dialog
        </Button>
        <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send updates
              occasionally.
          </DialogContentText>
            <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
              <TextValidator
                label="Palette Name"
                onChange={this.handleChange}
                name="newPaletteName"
                value={newPaletteName}
                validators={['required', 'isPaletteNameUnique']}
                errorMessages={['enter a color name', 'palette name already taken']}
              />
              <Button type="submit" variant='contained' color='primary' disableElevation>Save Palette</Button>
            </ValidatorForm>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
          </Button>
            <Button onClick={this.handleClose} color="primary">
              Subscribe
          </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
 
export default PaletteMetaForm;