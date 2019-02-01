import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Snackbar from '@material-ui/core/Snackbar';
import BookIcon from '@material-ui/icons/Book';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ClearIcon from '@material-ui/icons/Clear';
import LinearProgress from '@material-ui/core/LinearProgress';
import Book from './Book';
import SnackbarMessage from '../shared/SnackbarMessage';
import ConfirmationAlert from '../shared/ConfirmationAlert';

const styles = theme => ({
  card: {
    backgroundColor: theme.palette.background.paper,
  },
  search: {
    padding: 15,
  },
  listMessageGrid: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  progress: {
    padding: 3,
    margin: '15px 0 10px 0',
  },
});

class BookList extends Component {
  componentDidMount() {
    if (!this.props.emptyList && !this.props.books.length) {
      this.props.loadBooks();
    }
  }

  seminaryBooksFilter = book => (this.props.booksTab === 1 ? book.publisher === 'УБТС' : true);

  queryFilter = book => {
    const lowerCasedQuery = this.props.searchQuery.toLowerCase();
    return book.title.toLowerCase().includes(lowerCasedQuery) ||
      book.author.toLowerCase().includes(lowerCasedQuery) ||
      book.publisher.toLowerCase().includes(lowerCasedQuery) ||
      book.tags.some(tag => tag.toLowerCase().includes(lowerCasedQuery));
  }

  onChangeHelper = e => this.props.changeSearchQuery(e.target.value);

  clearSearchField = () => this.props.changeSearchQuery('');

  renderSearchBar = () => (
    <div className={this.props.classes.search}>
      <TextField
        name="search"
        helperText="Введіть назву книги, ім'я автора, видавництво або тег"
        label="Пошук"
        value={this.props.searchQuery}
        onChange={this.onChangeHelper}
        fullWidth
        variant="outlined"
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="Clear"
                onClick={this.clearSearchField}
              >
                <ClearIcon/>
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );

  handleTabChange = (_, value) => this.props.changeBooksTab(value);

  renderTabs = () => (
    <Tabs
      value={this.props.booksTab}
      onChange={this.handleTabChange}
      variant="fullWidth"
      indicatorColor="secondary"
      textColor="secondary"
    >
      <Tab icon={<BookIcon/>} label="Всі книги"/>
      <Tab icon={<FavoriteIcon/>} label="Видавництво УБТС"/>
    </Tabs>
  )

  renderDeleteAlert = () => {
    const { deleteAlert, hideDeleteAlert, deleteBook } = this.props;
    const onConfirm = () => {
      deleteBook(deleteAlert.bookId);
      hideDeleteAlert();
    };
    return (
      <ConfirmationAlert
        title="Ви справді бажаєте видалити дану книгу?"
        showAlert={deleteAlert.show}
        onConfirm={onConfirm}
        onReject={hideDeleteAlert}
      />
    );
  }

  renderDeleteErrorPopup = () => {
    const { deleteErrorMessage, toggleDeleteErrorMessage } = this.props;

    const hideErrorMessage = () => toggleDeleteErrorMessage(false);

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={deleteErrorMessage}
        autoHideDuration={3000}
        onClose={hideErrorMessage}
      >
        <SnackbarMessage
          message="Не вдалося видалити книгу"
          variant="error"
          onClose={hideErrorMessage}
        />
      </Snackbar>
    );
  }

  render() {
    const {
      classes,
      books,
      listUpdating,
      booksTab,
      changeSearchQuery,
      admin,
      showDeleteAlert,
    } = this.props;

    const bookList = books
      .filter(this.seminaryBooksFilter)
      .filter(this.queryFilter)
      .slice(0, 50)
      .map(book => (
        <Book
          data={book}
          applyFilter={changeSearchQuery}
          booksTab={booksTab}
          admin={admin}
          onDelete={showDeleteAlert}
          key={book.id}
        />
      ));

    return (
      <Card className={classes.card}>
        { this.renderSearchBar() }
        { this.renderTabs() }
        { listUpdating &&
          <LinearProgress className={classes.progress} color="secondary"/> }
        <List component="nav">
          { bookList }
          { !bookList.length &&
            <Grid container justify="center" className={classes.listMessageGrid}>
              <Typography variant="subtitle1" color="inherit">
                Нічого не знайдено
              </Typography>
            </Grid>
          }
        </List>
        { this.renderDeleteAlert() }
        { this.renderDeleteErrorPopup() }
      </Card>
    );
  }
}

BookList.propTypes = {
  classes: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired,
  listUpdating: PropTypes.bool.isRequired,
  emptyList: PropTypes.bool.isRequired,
  searchQuery: PropTypes.string.isRequired,
  booksTab: PropTypes.number.isRequired,
  loadBooks: PropTypes.func.isRequired,
  changeSearchQuery: PropTypes.func.isRequired,
  changeBooksTab: PropTypes.func.isRequired,
  admin: PropTypes.bool.isRequired,
  deleteAlert: PropTypes.shape({
    show: PropTypes.bool.isRequired,
    bookId: PropTypes.string,
  }).isRequired,
  showDeleteAlert: PropTypes.func.isRequired,
  hideDeleteAlert: PropTypes.func.isRequired,
  deleteBook: PropTypes.func.isRequired,
  deleteErrorMessage: PropTypes.bool.isRequired,
  toggleDeleteErrorMessage: PropTypes.func.isRequired,
};

export default withStyles(styles)(BookList);
