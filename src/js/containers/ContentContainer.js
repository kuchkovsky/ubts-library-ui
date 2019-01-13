import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Content from '../components/Content';

const mapStateToProps = state => ({
  contentLoad: state.getIn(['root', 'contentLoad']).toJS(),
  authenticated: state.getIn(['auth', 'authenticated']),
});

export default withRouter(connect(mapStateToProps)(Content));
