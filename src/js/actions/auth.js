import { createAction } from 'redux-actions';
import axios from 'axios';
import * as auth from '../utils/auth';
import history from '../utils/history';
import { SIGN_IN } from '../utils/apiEndpoints';
import { HOME } from '../utils/routes';
import { loadBooks } from './bookList';

export const SIGNING_IN = 'SIGNING_IN';
export const signingIn = createAction(SIGNING_IN);

export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const signInSuccess = createAction(SIGN_IN_SUCCESS);

export const SIGN_IN_FAILED = 'SIGN_IN_FAILED';
export const signInFailed = createAction(SIGN_IN_FAILED);

export const SIGNED_OUT = 'SIGNED_OUT';
export const signedOut = createAction(SIGNED_OUT);

export const signIn = credentials =>
  dispatch => {
    dispatch(signingIn());
    axios.post(SIGN_IN, credentials)
      .then(response => {
        auth.saveToken(response.data.token);
        auth.setupAxiosAuthHeader();
        dispatch((signInSuccess()));
        dispatch(loadBooks());
      })
      .catch(() => dispatch(signInFailed()));
  };

export const signOut = () =>
  dispatch => {
    auth.deleteToken();
    auth.removeAxiosAuthHeader();
    dispatch(signedOut());
    history.push(HOME);
    dispatch(loadBooks());
  };
