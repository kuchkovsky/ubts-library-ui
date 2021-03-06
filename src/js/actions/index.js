import { createAction } from 'redux-actions';
import axios from 'axios';

export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';
export const toggleDrawer = createAction(TOGGLE_DRAWER);

export const CONTENT_LOADING = 'CONTENT_LOADING';
export const contentLoading = createAction(CONTENT_LOADING);

export const CONTENT_LOADED = 'CONTENT_LOADED';
export const contentLoaded = createAction(CONTENT_LOADED);

export const CONTENT_LOAD_ERROR = 'CONTENT_LOAD_ERROR';
export const contentLoadError = createAction(CONTENT_LOAD_ERROR);

export const CONTENT_LOAD_EMPTY_CONTENT = 'CONTENT_LOAD_EMPTY_CONTENT';
export const contentLoadEmpty = createAction(CONTENT_LOAD_EMPTY_CONTENT);

export const loadMainContent = (url, onSuccessAction, noAnimation = false) =>
  dispatch => {
    if (!noAnimation) {
      dispatch(contentLoading());
    }
    axios.get(url)
      .then(response => {
        const { data } = response;
        if (Array.isArray(data) && !data.length) {
          dispatch(contentLoadEmpty());
        }
        dispatch(onSuccessAction(data));
        if (!noAnimation) {
          dispatch(contentLoaded());
        }
      })
      .catch(error => dispatch(contentLoadError({
        message: `Не вдалося завантажити дані: ${error.message}`,
        retryAction: () => dispatch(loadMainContent(url, onSuccessAction, noAnimation)),
      })));
  };
