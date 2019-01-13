import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const ReduxTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

ReduxTextField.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    error: PropTypes.string,
  }).isRequired,
};

export default ReduxTextField;
