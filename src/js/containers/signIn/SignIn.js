import { connect } from 'react-redux';
import { signIn } from '../../actions/auth';
import SignIn from '../../components/signIn/SignIn';

const mapStateToProps = state => ({
  auth: state.get('auth').toJS(),
});

const mapDispatchToProps = dispatch => ({
  onSubmit: credentials => dispatch(signIn(credentials)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
