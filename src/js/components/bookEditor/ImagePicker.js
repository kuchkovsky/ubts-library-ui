import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FilePond } from 'react-filepond';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { toBase64 } from '../../utils/files';

const styles = {
  root: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: {
    textAlign: 'center',
    paddingBottom: 10,
  },
};

class ImagePicker extends Component {
  handleChange = pondFiles =>
    pondFiles.map(pondFile =>
      toBase64(pondFile.file)
        .then(encodedFile => this.props.input.onChange(encodedFile)));

  handleRemove = () => this.props.input.onChange('');

  componentDidMount() {
    const initialFile = this.props.meta.initial;
    if (initialFile) {
      this.pond.addFile(initialFile);
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography className={classes.title} component="h1" variant="h6">
          Фото
        </Typography>
        <FilePond ref={ref => { this.pond = ref; } }
          onupdatefiles={this.handleChange}
          onremovefile={this.handleRemove}
          acceptedFileTypes={['image/jpeg', 'image/png']}
          imagePreviewHeight={500}
        />
      </div>
    );
  }
}

ImagePicker.propTypes = {
  classes: PropTypes.object.isRequired,
  meta: PropTypes.shape({
    initial: PropTypes.string,
  }).isRequired,
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
  }).isRequired,
};

export default withStyles(styles)(ImagePicker);
