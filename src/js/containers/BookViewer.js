
import { connect } from 'react-redux';
import BookViewer from '../components/bookViewer/BookViewer';
import {
  loadBook,
  changeCommentInput,
  sendComment,
  deleteComment,
} from '../actions/bookViewer';

const toJSHelper = state => (state ? state.toJS() : undefined);

const mapStateToProps = state => ({
  book: toJSHelper(state.getIn(['bookViewer', 'book'])),
  authenticated: state.getIn(['auth', 'authenticated']),
  admin: state.getIn(['auth', 'admin']),
  login: state.getIn(['auth', 'login']),
  comment: state.getIn(['bookViewer', 'comment']),
});

const mapDispatchToProps = dispatch => ({
  loadBook: id => dispatch(loadBook(id)),
  changeCommentInput: input => dispatch(changeCommentInput(input)),
  sendComment: bookId => dispatch(sendComment(bookId)),
  deleteComment: id => dispatch(deleteComment(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookViewer);
