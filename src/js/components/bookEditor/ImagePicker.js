import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { toBase64 } from '../../utils/files';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

registerPlugin(FilePondPluginFileValidateType);
registerPlugin(FilePondPluginImagePreview);

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
