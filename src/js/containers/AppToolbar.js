

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggleDrawer } from '../actions/index';
import { signOut } from '../actions/auth';
import AppToolbar from '../components/AppToolbar';

const mapStateToProps = state => ({
  authenticated: state.getIn(['auth', 'authenticated']),
  admin: state.getIn(['auth', 'admin']),
});

const mapDispatchToProps = dispatch => ({
  toggleDrawer: () => dispatch(toggleDrawer()),
  signOut: () => dispatch(signOut()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppToolbar));
