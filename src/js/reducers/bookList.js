import { fromJS } from 'immutable';
import * as actions from '../actions/bookList';

const initialState = fromJS({
  books: [],
  listUpdating: false,
  searchQuery: '',
  booksTab: 0,
  deleteAlert: {
    show: false,
    bookId: undefined,
  },
  deleteErrorMessage: false,
});

const bookListReducer = (state = initialState, action) => {
  switch (action.type) {
  case actions.BOOK_LIST_BOOKS_LOADED:
    return state.set('books', fromJS(action.payload)).set('listUpdating', false);

  case actions.BOOK_LIST_CHANGE_SEARCH_QUERY:
    return state.set('searchQuery', action.payload);

  case actions.BOOK_LIST_CHANGE_TAB:
    return state.set('booksTab', action.payload);

  case actions.BOOK_LIST_SHOW_DELETE_ALERT:
    return state.set('deleteAlert', fromJS({ show: true, bookId: action.payload }));

  case actions.BOOK_LIST_HIDE_DELETE_ALERT:
    return state.set('deleteAlert', initialState.get('deleteAlert'));

  case actions.BOOK_LIST_REMOVE_BOOK:
    return state.update('books', list => list.filter(book => book.get('id') !== action.payload));

  case actions.BOOK_LIST_TOGGLE_DELETE_ERROR_MESSAGE:
    return state.set('deleteErrorMessage', action.payload);

  case actions.BOOK_LIST_BOOK_UPDATING:
    return state.set('listUpdating', true)
      .update('books', list =>
        list.map(book => (book.get('id') === action.payload ? (
          book.merge(fromJS({ updating: true, cover: undefined }))
        ) : book)));

  default:
    return state;
  }
};

export default bookListReducer;
