import { connect } from 'react-redux';
import { resetBook, loadBook, uploadBook } from '../actions/bookEditor';
import BookEditor from '../components/bookEditor/BookEditor';

const mapStateToProps = state => ({
  initialValues: state.getIn(['bookEditor', 'book']),
  upload: state.getIn(['bookEditor', 'upload']).toJS(),
  uploadSuccessMessage: state.getIn(['bookEditor', 'uploadSuccessMessage']),
});

const mapDispatchToProps = dispatch => ({
  resetBook: () => dispatch(resetBook()),
  loadBook: id => dispatch(loadBook(id)),
  onSubmit: book => dispatch(uploadBook(book)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookEditor);
