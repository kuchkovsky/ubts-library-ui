import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { bigDisplayInfoStyles } from './Book';

const styles = theme => ({
  root: {
    background: 'none !important',
    color: 'blue',
    border: 'none',
    padding: '0 !important',
    font: 'inherit',
    borderBottom: '1px solid',
    cursor: 'pointer',
    [theme.breakpoints.up('sm')]: bigDisplayInfoStyles,
  },
});

const LinkButton = ({ classes, text, onClick }) => (
  <button className={classes.root} onClick={() => onClick(text)}>{text}</button>
);

LinkButton.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(LinkButton);
