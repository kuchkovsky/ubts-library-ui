import { reduxForm } from 'redux-form/immutable';
import { validateForm } from '../../utils/reduxForm';
import Form from '../../components/signIn/Form';

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

export default reduxForm({
  form: 'SignInForm',
  validate: validateForm(fields),
})(Form);
