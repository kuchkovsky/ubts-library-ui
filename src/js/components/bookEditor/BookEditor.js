import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import SnackbarMessage from '../shared/SnackbarMessage';
import { formStyles } from '../../styles/form';
import Form from '../../containers/bookEditor/Form';

class BookEditor extends Component {
  isEditMode = () => this.props.match.params.id !== 'new';

  componentDidMount() {
    const bookId = this.props.initialValues.get('id');
    const pathBookId = this.props.match.params.id;
    if (!this.isEditMode()) {
      this.props.resetBook();
    }
    if ((!bookId || bookId !== pathBookId) && this.isEditMode()) {
      this.props.loadBook(pathBookId);
    }
  }

  componentDidUpdate({ match: { params: prevParams } }) {
    const { match: { params } } = this.props;
    if (params.id !== prevParams.id && !this.isEditMode()) {
      this.props.resetBook();
    }
  }

  render() {
    const { classes, upload, uploadSuccessMessage } = this.props;

    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            {`${this.isEditMode() ? 'Редагувати' : 'Додати'} книгу`}
          </Typography>
          <Form {...this.props}/>
        </Paper>
        <div className={classes.infoMessageWrapper}>
          { upload.pending &&
            <SnackbarMessage variant="info" message="Надсилання даних..."/> }
          { uploadSuccessMessage &&
            <SnackbarMessage variant="success" message="Зміни успішно збережено"/> }
          { upload.error &&
            <SnackbarMessage variant="error" message={upload.errorMessage}/> }
        </div>
      </main>
    );
  }
}

BookEditor.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  initialValues: PropTypes.object.isRequired,
  resetBook: PropTypes.func.isRequired,
  loadBook: PropTypes.func.isRequired,
  upload: PropTypes.shape({
    pending: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
  }).isRequired,
  uploadSuccessMessage: PropTypes.bool.isRequired,
};

export default withStyles(formStyles())(BookEditor);
