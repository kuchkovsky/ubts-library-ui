import { connect } from 'react-redux';
import { contentLoading, contentLoaded } from '../actions/index';
import ProgressLink from '../components/shared/ProgressLink';

const mapDispatchToProps = dispatch => ({
  contentLoading: () => dispatch(contentLoading()),
  contentLoaded: () => dispatch(contentLoaded()),
});

export default connect(null, mapDispatchToProps)(ProgressLink);
