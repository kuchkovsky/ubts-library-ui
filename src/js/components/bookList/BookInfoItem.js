import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { bigDisplayInfoStyles } from './Book';
import LinkButton from './LinkButton';

const styles = theme => ({
  title: {
    display: 'inline',
    [theme.breakpoints.up('sm')]: bigDisplayInfoStyles,
  },
});

const BookInfoItem = ({ classes, title, data, applyFilter }) => (
  <span>
    <Typography component="span" className={classes.title} color="textPrimary">
      {title}:
    </Typography>
    {
      Array.isArray(data) ? (
        data.map((item, index) => (
          <span key={index}> <LinkButton text={item} onClick={applyFilter}/></span>
        ))
      ) : (
        <span> <LinkButton text={data} onClick={applyFilter}/></span>
      )
    }
  </span>
);


BookInfoItem.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  applyFilter: PropTypes.func.isRequired,
};

export default withStyles(styles)(BookInfoItem);
