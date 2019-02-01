import axios from 'axios';
import { createAction } from 'redux-actions';
import { BOOKS, ADD_BOOK_COMMENT, COMMENTS } from '../utils/apiEndpoints';
import { loadMainContent } from './index';

export const BOOK_VIEWER_RESET_BOOK = 'BOOK_VIEWER_RESET_BOOK';
export const resetBook = createAction(BOOK_VIEWER_RESET_BOOK);

export const BOOK_VIEWER_BOOK_LOADED = 'BOOK_VIEWER_BOOK_LOADED';
export const bookLoaded = createAction(BOOK_VIEWER_BOOK_LOADED);

export const BOOK_VIEWER_CHANGE_COMMENT_INPUT = 'BOOK_VIEWER_CHANGE_COMMENT_INPUT';
export const changeCommentInput = createAction(BOOK_VIEWER_CHANGE_COMMENT_INPUT);

export const BOOK_VIEWER_REMOVE_COMMENT = 'BOOK_VIEWER_REMOVE_COMMENT';
export const removeCommentFromList = createAction(BOOK_VIEWER_REMOVE_COMMENT);

export const BOOK_VIEWER_SHOW_COMMENT_DELETE_ALERT = 'BOOK_VIEWER_SHOW_COMMENT_DELETE_ALERT';
export const showCommentDeleteAlert = createAction(BOOK_VIEWER_SHOW_COMMENT_DELETE_ALERT);

export const BOOK_VIEWER_HIDE_COMMENT_DELETE_ALERT = 'BOOK_VIEWER_HIDE_COMMENT_DELETE_ALERT';
export const hideCommentDeleteAlert = createAction(BOOK_VIEWER_HIDE_COMMENT_DELETE_ALERT);

export const BOOK_VIEWER_TOGGLE_COMMENT_DELETE_ERROR_MESSAGE =
  'BOOK_VIEWER_TOGGLE_COMMENT_DELETE_ERROR_MESSAGE';
export const toggleCommentDeleteErrorMessage =
  createAction(BOOK_VIEWER_TOGGLE_COMMENT_DELETE_ERROR_MESSAGE);

export const loadBook = id =>
  dispatch =>
    dispatch(loadMainContent(`${BOOKS}/${id}`, bookLoaded));

export const sendComment = bookId =>
  (dispatch, getState) => {
    const comment = getState().getIn(['bookViewer', 'comment']);
    axios.post(`${ADD_BOOK_COMMENT}/${bookId}`, { text: comment })
      .then(() => {
        dispatch(loadBook(bookId));
        dispatch(changeCommentInput(''));
      });
  };

export const deleteComment = id =>
  dispatch =>
    axios.delete(`${COMMENTS}/${id}`)
      .then(() => dispatch(removeCommentFromList(id)))
      .catch(() => dispatch(toggleCommentDeleteErrorMessage(true)));
