import { fromJS } from 'immutable';
import * as actions from '../actions/bookEditor';

const initialState = fromJS({
  book: {
    id: undefined,
    title: '',
    author: '',
    publisher: '',
    publicationYear: '',
    pages: '',
    description: '',
    availableOffline: false,
    tags: [],
    coverFile: '',
    uploadedDocument: '',
    document: '',
  },
  upload: {
    pending: false,
    error: false,
    errorMessage: '',
  },
  documentUploadPending: false,
  uploadSuccessMessage: false,
});

const bookEditorReducer = (state = initialState, action) => {
  switch (action.type) {
  case actions.BOOK_EDITOR_RESET_BOOK:
    return state.set('book', initialState.get('book'));

  case actions.BOOK_EDITOR_BOOK_LOADED:
    return state.set('book', fromJS(action.payload));

  case actions.BOOK_EDITOR_BOOK_UPLOADING:
    return state
      .set('book', fromJS(action.payload))
      .mergeIn(['upload'], fromJS({ pending: true, error: false, errorMessage: '' }));

  case actions.BOOK_EDITOR_BOOK_UPLOADED:
    return state
      .set('book', initialState.get('book'))
      .setIn(['upload', 'pending'], false);

  case actions.BOOK_EDITOR_BOOK_UPLOAD_ERROR:
    return state.mergeIn(['upload'], fromJS({ pending: false, error: true, errorMessage: action.payload }));

  case actions.BOOK_EDITOR_DOCUMENT_UPLOADING:
    return state.set('documentUploadPending', true);

  case actions.BOOK_EDITOR_DOCUMENT_UPLOADED:
    return state.set('documentUploadPending', false);

  case actions.BOOK_EDITOR_SHOW_UPLOAD_SUCCESS_MESSAGE:
    return state.set('uploadSuccessMessage', true);

  case actions.BOOK_EDITOR_HIDE_UPLOAD_SUCCESS_MESSAGE:
    return state.set('uploadSuccessMessage', false);

  default:
    return state;
  }
};

export default bookEditorReducer;
