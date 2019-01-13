import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import * as routes from '../../utils/routes';
import BookInfoItem from './BookInfoItem';

export const bigDisplayInfoStyles = {
  fontSize: 15,
};

const styles = theme => ({
  cover: {
    borderRadius: 0,
    width: 150,
    [theme.breakpoints.down('sm')]: {
      width: 100,
    },
    [theme.breakpoints.up('sm')]: {
      width: 200,
    },
    height: 'auto',
  },
  format: {
    [theme.breakpoints.up('sm')]: bigDisplayInfoStyles,
  },
});

const Book = ({ classes, data, applyFilter, booksTab, onDelete }) => (
  <ListItem button>
    <ListItemAvatar>
      <Avatar alt={data.title}
        src={ data.cover ? (
          `${process.env.API_URL}/files/books/${data.id}/covers/${data.cover}`
        ) : (
          '/src/img/book.png'
        ) }
        className={classes.cover}/>
    </ListItemAvatar>
    <ListItemText
      primary={
        <Typography variant="headline" color="textPrimary">
          {data.title}
        </Typography>
      }
      secondary={
        <React.Fragment>
          <BookInfoItem title="Автор" data={data.author} applyFilter={applyFilter}/>
          <br/>
          { booksTab === 0 &&
            <React.Fragment>
              <BookInfoItem title="Видавництво" data={data.publisher} applyFilter={applyFilter}/>
              <br/>
            </React.Fragment> }
          { !!data.tags.length && <BookInfoItem title="Теги" data={data.tags} applyFilter={applyFilter}/> }
          { Object.prototype.hasOwnProperty.call(data, 'availableOffline') &&
            <Typography className={classes.format} component="span" color="textPrimary">
              В наявності:{data.availableOffline && ' друкована книга,'} електронна книга
            </Typography> }
        </React.Fragment>
      }/>
    <ListItemSecondaryAction>
      <Grid container direction="column">
        <Grid>
          <IconButton aria-label="Edit" component={Link} to={`${routes.BOOKS}/${data.id}`}>
            <EditIcon/>
          </IconButton>
        </Grid>
        <Grid>
          <IconButton aria-label="Delete" onClick={() => onDelete(data.id)}>
            <DeleteIcon/>
          </IconButton>
        </Grid>
      </Grid>
    </ListItemSecondaryAction>
  </ListItem>
);

Book.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    publisher: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    cover: PropTypes.string,
    availableOffline: PropTypes.bool,
  }).isRequired,
  applyFilter: PropTypes.func.isRequired,
  booksTab: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default withStyles(styles)(Book);
