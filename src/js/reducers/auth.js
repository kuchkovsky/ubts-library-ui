import { fromJS } from 'immutable';
import * as actions from '../actions/auth';
import {
  isAuthenticated,
  isAdmin,
  getLogin,
} from '../utils/auth';

const initialState = fromJS({
  authenticated: isAuthenticated(),
  admin: isAdmin(),
  login: getLogin(),
  pending: false,
  error: false,
});

const authReducer = (state = initialState, action) => {
  switch (action.type) {
  case actions.SIGNING_IN:
    return state.merge(fromJS({
      authenticated: false,
      admin: false,
      login: null,
      pending: true,
      error: false,
    }));

  case actions.SIGN_IN_SUCCESS:
    return state.merge(fromJS({
      authenticated: true,
      admin: isAdmin(),
      login: getLogin(),
      pending: false,
    }));

  case actions.SIGN_IN_FAILED:
    return state.merge(fromJS({ pending: false, error: true }));

  case actions.SIGNED_OUT:
    return state.merge(fromJS({ authenticated: false, admin: false }));

  default:
    return state;
  }
};

export default authReducer;
