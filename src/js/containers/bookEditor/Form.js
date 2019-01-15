import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form/immutable';
import { validateForm } from '../../utils/reduxForm';
import Form from '../../components/bookEditor/Form';

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

const formName = 'BookEditorForm';

const ReduxForm = reduxForm({
  form: formName,
  validate: validateForm(fields),
  enableReinitialize: true,
})(Form);

const selector = formValueSelector(formName);

const SelectorForm = connect(
  state => ({
    document: selector(state, 'document'),
  }),
)(ReduxForm);

export default SelectorForm;
