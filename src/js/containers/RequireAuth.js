import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SIGN_IN } from '../utils/routes';

export default (ComposedComponent, adminOnly = false) => {
  class RequireAuth extends Component {
    /* eslint-disable */

    UNSAFE_componentWillMount() {
      if (!this.props.authenticated || (adminOnly && !this.props.admin)) {
        this.props.history.push(SIGN_IN);
      }
    }
  
    UNSAFE_componentWillUpdate() {
      if (!this.props.authenticated || (adminOnly && !this.props.admin)) {
        this.props.history.push(SIGN_IN);
      }
    }

    /* eslint-enable */

    render() {
      return <ComposedComponent {...this.props}/>;
    }
  }

  RequireAuth.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    admin: PropTypes.bool.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  const mapStateToProps = state => ({
    authenticated: state.getIn(['auth', 'authenticated']),
    admin: state.getIn(['auth', 'admin']),
  });

  return connect(mapStateToProps)(RequireAuth);
};
