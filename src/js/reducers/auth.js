import { fromJS } from 'immutable';
import * as actions from '../actions/auth';
import { isAuthenticated } from '../utils/auth';

const initialState = fromJS({
  authenticated: isAuthenticated(),
  pending: false,
  error: false,
});

const authReducer = (state = initialState, action) => {
  switch (action.type) {
  case actions.SIGNING_IN:
    return state.merge(fromJS({ authenticated: false, pending: true, error: false }));

  case actions.SIGN_IN_SUCCESS:
    return state.merge(fromJS({ authenticated: true, pending: false }));

  case actions.SIGN_IN_FAILED:
    return state.merge(fromJS({ pending: false, error: true }));

  case actions.SIGNED_OUT:
    return state.set('authenticated', false);

  default:
    return state;
  }
};

export default authReducer;
