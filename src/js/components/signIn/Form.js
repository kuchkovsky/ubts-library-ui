import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import ReduxTextField from '../shared/ReduxTextField';
import { validateForm } from '../../utils/reduxForm';

const fields = [
  {
    name: 'login',
    required: 'Введіть логін',
  },
  {
    name: 'password',
    required: 'Введіть пароль',
    minLength: [8, 'Пароль повинен містити мінімум 8 символів'],
  },
];

const Form = ({ classes, handleSubmit, pristine, invalid, pending }) => (
  <form onSubmit={handleSubmit} className={classes.form}>
    <Field name="login" label="Логін"
      component={ReduxTextField}
      fullWidth variant="outlined" margin="normal"/>
    <Field name="password" label="Пароль"
      component={ReduxTextField}
      type="password"
      fullWidth variant="outlined" margin="normal"/>
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      disabled={pristine || invalid || pending}
      className={classes.submit}
    >
      Увійти
    </Button>
  </form>
);

Form.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  pending: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'SignInForm',
  validate: validateForm(fields),
})(Form);
