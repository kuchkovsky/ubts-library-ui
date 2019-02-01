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
import DownloadIcon from '@material-ui/icons/CloudDownload';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import bookImg from '../../../img/book.png';
import { BOOK_EDITOR, BOOK_VIEWER } from '../../utils/routes';
import { BOOK_DOCUMENT } from '../../utils/apiEndpoints';
import BookInfoItem from './BookInfoItem';
import { downloadFile } from '../../utils/files';

export const bigDisplayInfoStyles = {
  fontSize: 15,
};

const styles = theme => ({
  cover: {
    borderRadius: 0,
    [theme.breakpoints.down('sm')]: {
      width: 100,
    },
    [theme.breakpoints.up('sm')]: {
      width: 150,
    },
    height: 'auto',
  },
  format: {
    [theme.breakpoints.up('sm')]: bigDisplayInfoStyles,
  },
  progressWrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
    opacity: 0.5,
    pointerEvents: 'none',
  },
  progressSpinner: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -32,
    marginLeft: -32,
  },
});

const preventLinkClick = e => e.target.type && e.preventDefault();

const Book = ({ classes, data, applyFilter, booksTab, admin, onDelete }) => (
  <ListItem button onClick={preventLinkClick} component={Link} to={`${BOOK_VIEWER}/${data.id}`}
    className={data.updating ? classes.progressWrapper : ''}>
    { data.updating &&
      <CircularProgress size={64} className={classes.progressSpinner} color="secondary" disableShrink/> }
    <ListItemAvatar>
      <Avatar alt={data.title}
        src={ data.cover ? (
          `${process.env.API_URL}/files/books/${data.id}/covers/${data.cover}`
        ) : (
          bookImg
        ) }
        className={classes.cover}/>
    </ListItemAvatar>
    <ListItemText
      primary={
        <Typography variant="h5" color="textPrimary">
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
          <Typography className={classes.format} component="span" color="textPrimary">
            В наявності:
            {` ${data.availableOffline ? `друкована книга${data.availableOnline ? ', ' : ''}` : ''}`}
            {` ${data.availableOnline ? 'електронна книга' : ''}`}
            { !(data.availableOffline || data.availableOnline) && 'немає' }
          </Typography>
        </React.Fragment>
      }/>
    <ListItemSecondaryAction>
      <Grid container direction="column" className={data.updating ? classes.progressWrapper : ''}>
        { admin &&
            <React.Fragment>
              <Grid>
                <IconButton aria-label="Edit" component={Link} to={`${BOOK_EDITOR}/${data.id}`}>
                  <EditIcon/>
                </IconButton>
              </Grid>
              <Grid>
                <IconButton aria-label="Delete" onClick={() => onDelete(data.id)}>
                  <DeleteIcon/>
                </IconButton>
              </Grid>
            </React.Fragment> }
        { data.availableOnline &&
            <Grid>
              <IconButton
                aria-label="Download"
                onClick={() => downloadFile(`${process.env.API_URL}${BOOK_DOCUMENT(data.id)}`)}
              >
                <DownloadIcon/>
              </IconButton>
            </Grid> }
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
    availableOnline: PropTypes.bool,
    updating: PropTypes.bool,
  }).isRequired,
  applyFilter: PropTypes.func.isRequired,
  booksTab: PropTypes.number.isRequired,
  admin: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default withStyles(styles)(Book);
