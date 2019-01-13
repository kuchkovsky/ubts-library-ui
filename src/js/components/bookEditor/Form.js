import React from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray, reduxForm } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import ReduxTextField from '../shared/ReduxTextField';
import ReduxCheckbox from '../shared/ReduxCheckbox';
import { validateForm } from '../../utils/reduxForm';
import ImagePicker from './ImagePicker';
import TagEditor from './TagEditor';

const fields = [
  {
    name: 'title',
    required: 'Введіть назву книги',
  },
  {
    name: 'author',
    required: 'Введіть ім\'я автора',
  },
  {
    name: 'publisher',
    required: 'Введіть назву видавництва',
  },
  {
    name: 'publicationYear',
    required: 'Введіть рік видання',
  },
  {
    name: 'pages',
    required: 'Введіть кількість сторінок',
  },
  {
    name: 'description',
    required: 'Введіть опис книги',
  },
];

const Form = ({ classes, handleSubmit, pristine, invalid, upload }) => (
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
    <Field name="description" label="Опис книги"
      component={ReduxTextField}
      fullWidth variant="outlined" margin="normal"/>
    <Field name="availableOffline" label="Є в друкованому форматі"
      component={ReduxCheckbox}/>
    <FieldArray name="tags" component={TagEditor}/>
    <Field name="coverFile" type="file" component={ImagePicker}/>
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      disabled={!upload.error && (pristine || invalid || upload.pending)}
      className={classes.submit}
    >
      Завантажити книгу
    </Button>
  </form>
);

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
  onSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'BookEditorForm',
  validate: validateForm(fields),
  enableReinitialize: true,
})(Form);
