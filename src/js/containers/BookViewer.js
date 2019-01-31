
import { connect } from 'react-redux';
import BookViewer from '../components/BookViewer';
import {
  loadBook,
} from '../actions/bookViewer';

const toJSHelper = state => (state ? state.toJS() : undefined);

const mapStateToProps = state => ({
  book: toJSHelper(state.getIn(['bookViewer', 'book'])),
});

const mapDispatchToProps = dispatch => ({
  loadBook: id => dispatch(loadBook(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookViewer);
