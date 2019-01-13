import { createAction } from 'redux-actions';
import axios from 'axios';
import { BOOKS } from '../utils/apiEndpoints';
import { loadMainContent } from './index';
import { loadBooks } from './bookList';

export const BOOK_EDITOR_RESET_BOOK = 'BOOK_EDITOR_RESET_BOOK';
export const resetBook = createAction(BOOK_EDITOR_RESET_BOOK);

export const BOOK_EDITOR_BOOK_LOADED = 'BOOK_EDITOR_BOOK_LOADED';
export const bookLoaded = createAction(BOOK_EDITOR_BOOK_LOADED);

export const BOOK_EDITOR_BOOK_UPLOADING = 'BOOK_EDITOR_BOOK_UPLOADING';
export const bookUploading = createAction(BOOK_EDITOR_BOOK_UPLOADING);

export const BOOK_EDITOR_BOOK_UPLOADED = 'BOOK_EDITOR_BOOK_UPLOADED';
export const bookUploaded = createAction(BOOK_EDITOR_BOOK_UPLOADED);

export const BOOK_EDITOR_BOOK_UPLOAD_ERROR = 'BOOK_EDITOR_BOOK_UPLOAD_ERROR';
export const bookUploadFailed = createAction(BOOK_EDITOR_BOOK_UPLOAD_ERROR);

export const BOOK_EDITOR_SHOW_UPLOAD_SUCCESS_MESSAGE = 'BOOK_EDITOR_SHOW_UPLOAD_SUCCESS_MESSAGE';
export const showBookUploadSuccessMessage = createAction(BOOK_EDITOR_SHOW_UPLOAD_SUCCESS_MESSAGE);

export const BOOK_EDITOR_HIDE_UPLOAD_SUCCESS_MESSAGE = 'BOOK_EDITOR_HIDE_UPLOAD_SUCCESS_MESSAGE';
export const hideBookUploadSuccessMessage = createAction(BOOK_EDITOR_HIDE_UPLOAD_SUCCESS_MESSAGE);

export const loadBook = id =>
  dispatch =>
    dispatch(loadMainContent(`${BOOKS}/${id}`, bookLoaded));

export const uploadBook = book =>
  dispatch => {
    dispatch(bookUploading(book));
    axios({
      method: book.get('id') ? 'PUT' : 'POST',
      url: BOOKS,
      data: book,
    })
      .then(() => {
        dispatch(bookUploaded());
        dispatch(showBookUploadSuccessMessage());
        setTimeout(() => dispatch(hideBookUploadSuccessMessage()), 3000);
        dispatch(loadBooks());
      })
      .catch(error => dispatch(bookUploadFailed(`Не вдалося надіслати дані: ${error.message}`)));
  };
