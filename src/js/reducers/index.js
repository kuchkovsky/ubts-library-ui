import { fromJS } from 'immutable';
import * as actions from '../actions/index';

const initialState = fromJS({
  drawer: {
    open: false,
  },
  contentLoad: {
    loading: false,
    error: false,
    empty: false,
  },
});

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
  case actions.TOGGLE_DRAWER:
    return state.setIn(['drawer', 'open'], !state.getIn(['drawer', 'open']));

  case actions.CONTENT_LOADING:
    return state.set('contentLoad', fromJS({ loading: true, error: false, empty: false }));

  case actions.CONTENT_LOADED:
    return state.mergeIn(['contentLoad'], fromJS({ loading: false, error: false }));

  case actions.CONTENT_LOAD_ERROR:
    return state.mergeIn(['contentLoad'], fromJS({
      loading: false,
      error: true,
      errorData: action.payload,
    }));

  case actions.CONTENT_LOAD_EMPTY_CONTENT:
    return state.setIn(['contentLoad', 'empty'], true);

  default:
    return state;
  }
};

export default rootReducer;
