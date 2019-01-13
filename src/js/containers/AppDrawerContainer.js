
import { connect } from 'react-redux';
import { toggleDrawer } from '../actions/index';
import { signOut } from '../actions/auth';
import AppDrawer from '../components/AppDrawer';

const mapStateToProps = state => ({
  open: state.getIn(['root', 'drawer', 'open']),
  authenticated: state.getIn(['auth', 'authenticated']),
});

const mapDispatchToProps = dispatch => ({
  toggleDrawer: () => dispatch(toggleDrawer()),
  signOut: () => dispatch(signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppDrawer);
