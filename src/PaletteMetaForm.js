import React from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Picker } from 'emoji-mart'
import { withStyles } from '@material-ui/styles';
import 'emoji-mart/css/emoji-mart.css';
import media from './mediaQueries';

const styles = {
 saveBtn : {
    [media('xs')]: {
      padding: '0 6px',
      fontSize: '.8rem',
      lineHeight: '30px'
    }
  }
}

class PaletteMetaForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      newPaletteName: '',
      stage: '' 
    }
  }

  handleClickOpen = () => {
    this.setState({stage: 'form'});
  };

  handleClose = () => {
    this.setState({stage: '', newPaletteName: ''});
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  };

  showEmojiPicker = () => {
    this.setState({stage: 'emoji'})
  }

  savePalette = (emoji) => {
    const paletteName = this.state.newPaletteName;
    const newPalette = {
      id: paletteName.toLowerCase().replace(/ /g, '-'),
      emoji: emoji.native, 
      paletteName
    }
    this.props.handleSubmit(newPalette);
    this.setState({ stage: '' })
  }

  componentDidMount = () => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
      return this.props.palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
    });
  }

  render() { 
    const { newPaletteName, stage } = this.state;
    return (
      <div>
        <Dialog open={stage === 'emoji'} onClose={this.handleClose}>
          <DialogTitle id="form-dialog-title">Choose a Palette Emoji</DialogTitle>
          <Picker set='emojione' onSelect={this.savePalette} title='Choose Palette Emoji'/>
        </Dialog>
        <Button className={this.props.classes.saveBtn} style={{marginRight: '.5rem'}} variant="contained" color="secondary" onClick={this.handleClickOpen} disableElevation>
         Save
        </Button>
        <Dialog style={{ padding: '1rem' }} open={stage === 'form'} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Choose a Palette name</DialogTitle>
          <ValidatorForm onSubmit={this.showEmojiPicker}>
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
 
export default withStyles(styles)(PaletteMetaForm);