import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProgressLink extends React.Component {
  static propTypes = {
    delay: PropTypes.number,
    to: PropTypes.string,
    contentLoading: PropTypes.func,
    contentLoaded: PropTypes.func,
  };

  static defaultProps = {
    delay: 0,
  };

  static contextTypes = Link.contextTypes;

  constructor(props) {
    super(props);
    this.timeout = null;
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  handleClick = (e) => {
    const { to, delay, contentLoading, contentLoaded } = this.props;
    const { history } = this.context.router;

    if (history.location.pathname === to) {
      return;
    }

    contentLoading();

    if (e.defaultPrevented) {
      return;
    }
    e.preventDefault();

    this.timeout = setTimeout(() => {
      history.push(to);
      contentLoaded();
    }, delay);
  };

  render() {
    const props = Object.assign({}, this.props);
    delete props.delay;
    delete props.contentLoading;
    delete props.contentLoaded;

    return (
      <Link {...props} onClick={this.handleClick}/>
    );
  }
}

export default ProgressLink;
