
import { connect } from 'react-redux';
import BookList from '../components/bookList/BookList';
import {
  loadBooks,
  changeSearchQuery,
  changeBooksTab,
  showDeleteAlert,
  hideDeleteAlert,
  deleteBook,
  toggleDeleteErrorMessage,
} from '../actions/bookList';


const mapStateToProps = state => ({
  books: state.getIn(['bookList', 'books']).toJS(),
  searchQuery: state.getIn(['bookList', 'searchQuery']),
  booksTab: state.getIn(['bookList', 'booksTab']),
  deleteAlert: state.getIn(['bookList', 'deleteAlert']).toJS(),
  deleteErrorMessage: state.getIn(['bookList', 'deleteErrorMessage']),
  authenticated: state.getIn(['auth', 'authenticated']),
});

const mapDispatchToProps = dispatch => ({
  loadBooks: () => dispatch(loadBooks()),
  changeSearchQuery: query => dispatch(changeSearchQuery(query)),
  changeBooksTab: tab => dispatch(changeBooksTab(tab)),
  showDeleteAlert: bookId => dispatch(showDeleteAlert(bookId)),
  hideDeleteAlert: () => dispatch(hideDeleteAlert()),
  deleteBook: id => dispatch(deleteBook(id)),
  toggleDeleteErrorMessage: open => dispatch(toggleDeleteErrorMessage(open)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
