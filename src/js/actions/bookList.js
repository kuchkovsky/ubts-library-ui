import { createAction } from 'redux-actions';
import axios from 'axios';
import { BOOKS } from '../utils/apiEndpoints';
import { loadMainContent } from './index';

export const BOOK_LIST_BOOKS_LOADED = 'BOOK_LIST_BOOKS_LOADED';
export const booksLoaded = createAction(BOOK_LIST_BOOKS_LOADED);

export const BOOK_LIST_CHANGE_SEARCH_QUERY = 'BOOK_LIST_CHANGE_SEARCH_QUERY';
export const changeSearchQuery = createAction(BOOK_LIST_CHANGE_SEARCH_QUERY);

export const BOOK_LIST_CHANGE_TAB = 'BOOK_LIST_CHANGE_TAB';
export const changeBooksTab = createAction(BOOK_LIST_CHANGE_TAB);

export const BOOK_LIST_SHOW_DELETE_ALERT = 'BOOK_LIST_SHOW_DELETE_ALERT';
export const showDeleteAlert = createAction(BOOK_LIST_SHOW_DELETE_ALERT);

export const BOOK_LIST_HIDE_DELETE_ALERT = 'BOOK_LIST_HIDE_DELETE_ALERT';
export const hideDeleteAlert = createAction(BOOK_LIST_HIDE_DELETE_ALERT);

export const BOOK_LIST_REMOVE_BOOK = 'BOOK_LIST_REMOVE_BOOK';
export const removeBookFromList = createAction(BOOK_LIST_REMOVE_BOOK);

export const BOOK_LIST_TOGGLE_DELETE_ERROR_MESSAGE = 'BOOK_LIST_TOGGLE_DELETE_ERROR_MESSAGE';
export const toggleDeleteErrorMessage = createAction(BOOK_LIST_TOGGLE_DELETE_ERROR_MESSAGE);

export const loadBooks = () =>
  dispatch =>
    dispatch(loadMainContent(BOOKS, booksLoaded));

export const deleteBook = id =>
  dispatch =>
    axios.delete(`${BOOKS}/${id}`)
      .then(() => dispatch(removeBookFromList(id)))
      .catch(() => dispatch(toggleDeleteErrorMessage(true)));
