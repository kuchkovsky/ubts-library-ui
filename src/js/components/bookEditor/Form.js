import React from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import ReduxTextField from '../shared/ReduxTextField';
import ReduxCheckbox from '../shared/ReduxCheckbox';
import ImagePicker from './ImagePicker';
import TagEditor from './TagEditor';
import DocumentPicker from './DocumentPicker';

const OfflineBookFields = ({ availableOffline }) => (
  <Collapse in={availableOffline}>
    <Field name="numberOfCopies" label="Кількість примірників"
      component={ReduxTextField}
      type="number" fullWidth variant="outlined" margin="normal"/>
    <Field name="price" label="Ціна"
      component={ReduxTextField}
      type="number" fullWidth variant="outlined" margin="normal"/>
  </Collapse>
);

OfflineBookFields.propTypes = {
  availableOffline: PropTypes.bool,
};

const Form = props => {
  const {
    classes,
    handleSubmit,
    pristine,
    invalid,
    upload,
    documentUploadPending,
    ...other
  } = props;

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Field name="title" label="Назва книги"
        component={ReduxTextField}
        fullWidth variant="outlined" margin="normal"/>
      <Field name="author" label="Автор"
        component={ReduxTextField}
        fullWidth variant="outlined" margin="normal"/>
      <Field name="publisher" label="Видавництво"
        component={ReduxTextField}
        fullWidth variant="outlined" margin="normal"/>
      <Field name="publicationYear" label="Рік видання"
        component={ReduxTextField}
        type="number" fullWidth variant="outlined" margin="normal"/>
      <Field name="pages" label="Кількість сторінок"
        component={ReduxTextField}
        type="number" fullWidth variant="outlined" margin="normal"/>
      <Field name="classifier" label="Класифікатор"
        component={ReduxTextField}
        fullWidth variant="outlined" margin="normal"/>
      <Field name="description" label="Опис книги"
        component={ReduxTextField} multiline
        fullWidth variant="outlined" margin="normal"/>
      <Field name="notes" label="Примітки"
        component={ReduxTextField}
        fullWidth variant="outlined" margin="normal"/>
      <Field name="availableOffline" label="Є в друкованому форматі"
        component={ReduxCheckbox}/>
      <OfflineBookFields {...props}/>
      <FieldArray name="tags" component={TagEditor}/>
      <Field name="coverFile" type="file" component={ImagePicker}/>
      <DocumentPicker {...other}/>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        disabled={!upload.error && (pristine || invalid || upload.pending || documentUploadPending)}
        className={classes.submit}
      >
        Завантажити книгу
      </Button>
    </form>
  );
};

Form.propTypes = {
  classes: PropTypes.object.isRequired,
  initialValues: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  upload: PropTypes.shape({
    pending: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
  }).isRequired,
  documentUploadPending: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
