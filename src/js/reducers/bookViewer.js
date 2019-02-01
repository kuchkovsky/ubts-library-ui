import { fromJS } from 'immutable';
import * as actions from '../actions/bookViewer';

const initialState = fromJS({
  book: undefined,
  comment: '',
  commentDeleteAlert: {
    show: false,
    commentId: undefined,
  },
  commentDeleteErrorMessage: false,
});

const bookViewerReducer = (state = initialState, action) => {
  switch (action.type) {
  case actions.BOOK_VIEWER_RESET_BOOK:
    return state.set('book', initialState.get('book'));

  case actions.BOOK_VIEWER_BOOK_LOADED:
    return state.set('book', fromJS(action.payload));

  case actions.BOOK_VIEWER_CHANGE_COMMENT_INPUT:
    return state.set('comment', action.payload);

  case actions.BOOK_VIEWER_REMOVE_COMMENT:
    return state.updateIn(['book', 'comments'], list =>
      list.filter(comment => comment.get('id') !== action.payload));

  case actions.BOOK_VIEWER_SHOW_COMMENT_DELETE_ALERT:
    return state.set('commentDeleteAlert', fromJS({ show: true, commentId: action.payload }));

  case actions.BOOK_VIEWER_HIDE_COMMENT_DELETE_ALERT:
    return state.set('commentDeleteAlert', initialState.get('commentDeleteAlert'));

  case actions.BOOK_VIEWER_TOGGLE_COMMENT_DELETE_ERROR_MESSAGE:
    return state.set('commentDeleteErrorMessage', action.payload);

  default:
    return state;
  }
};

export default bookViewerReducer;
