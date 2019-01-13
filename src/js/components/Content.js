import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import ContentRoutes from './ContentRoutes';
import ErrorCard from './ErrorCard';

const styles = {
  content: {
    padding: 10,
    width: '100%',
    maxWidth: 700,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  progress: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    marginLeft: -40,
  },
};

const Content = props => {
  const { classes, contentLoad, authenticated, location } = props;
  const { loading, error, errorData } = contentLoad;

  return (
    <div className={classes.content}>
      { loading && <CircularProgress className={classes.progress} size={80}
        disableShrink={true}/> }
      { !loading && !error && <ContentRoutes authenticated={authenticated} location={location}/> }
      { !loading && error && <ErrorCard errorData={errorData}/> }
    </div>
  );
};

Content.propTypes = {
  classes: PropTypes.object.isRequired,
  contentLoad: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    errorData: PropTypes.shape({
      message: PropTypes.string.isRequired,
      retryAction: PropTypes.func.isRequired,
    }),
  }).isRequired,
  authenticated: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);
