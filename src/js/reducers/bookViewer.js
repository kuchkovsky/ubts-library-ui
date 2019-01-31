import { fromJS } from 'immutable';
import * as actions from '../actions/bookViewer';

const initialState = fromJS({
  book: undefined,
});

const bookViewerReducer = (state = initialState, action) => {
  switch (action.type) {
  case actions.BOOK_VIEWER_RESET_BOOK:
    return state.set('book', initialState.get('book'));

  case actions.BOOK_VIEWER_BOOK_LOADED:
    return state.set('book', fromJS(action.payload));

  default:
    return state;
  }
};

export default bookViewerReducer;
