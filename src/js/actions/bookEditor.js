import { createAction } from 'redux-actions';
import axios from 'axios';
import { BOOKS } from '../utils/apiEndpoints';
import { loadMainContent } from './index';
import { loadBooks, bookUpdating } from './bookList';
import { resetBook as bookViewerResetBook } from './bookViewer';

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

export const BOOK_EDITOR_DOCUMENT_UPLOADING = 'BOOK_EDITOR_DOCUMENT_UPLOADING';
export const documentUploading = createAction(BOOK_EDITOR_DOCUMENT_UPLOADING);

export const BOOK_EDITOR_DOCUMENT_UPLOADED = 'BOOK_EDITOR_DOCUMENT_UPLOADED';
export const documentUploaded = createAction(BOOK_EDITOR_DOCUMENT_UPLOADED);

export const loadBook = (id, noAnimation = false) =>
  dispatch =>
    dispatch(loadMainContent(`${BOOKS}/${id}`, bookLoaded, noAnimation));

export const uploadBook = book =>
  dispatch => {
    const bookId = book.get('id');
    dispatch(bookUploading(book));
    axios({
      method: bookId ? 'PUT' : 'POST',
      url: BOOKS,
      data: book,
    })
      .then(() => {
        dispatch(bookUploaded(bookId));
        dispatch(showBookUploadSuccessMessage());
        setTimeout(() => dispatch(hideBookUploadSuccessMessage()), 3000);
        dispatch(bookUpdating(bookId));
        if (bookId) {
          dispatch(loadBook(bookId, true));
        }
        dispatch(loadBooks(true));
        dispatch(bookViewerResetBook());
      })
      .catch(error => dispatch(bookUploadFailed(`Не вдалося надіслати дані: ${error.message}`)));
  };
