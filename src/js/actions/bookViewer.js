import { createAction } from 'redux-actions';
import { BOOKS } from '../utils/apiEndpoints';
import { loadMainContent } from './index';

export const BOOK_VIEWER_RESET_BOOK = 'BOOK_VIEWER_RESET_BOOK';
export const resetBook = createAction(BOOK_VIEWER_RESET_BOOK);

export const BOOK_VIEWER_BOOK_LOADED = 'BOOK_VIEWER_BOOK_LOADED';
export const bookLoaded = createAction(BOOK_VIEWER_BOOK_LOADED);

export const loadBook = id =>
  dispatch =>
    dispatch(loadMainContent(`${BOOKS}/${id}`, bookLoaded));
