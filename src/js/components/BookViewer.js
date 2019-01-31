import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import bookImg from '../../img/book.png';
import { BOOK_DOCUMENT } from '../utils/apiEndpoints';
import { downloadFile } from '../utils/files';

export const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    [theme.breakpoints.up(700 + theme.spacing.unit * 3 * 2)]: {
      width: 700,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  fieldList: {
    maxWidth: 350,
  },
  propName: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  downloadButton: {
    marginTop: 10,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
});

class BookViewer extends Component {
  componentDidMount() {
    const { book } = this.props;
    const { id: bookId } = this.props.match.params;
    if (!book || book.id !== bookId) {
      this.props.loadBook(bookId);
    }
  }

  renderTitle = title => (
    <Typography variant="h4" gutterBottom>
      { title }
    </Typography>
  )

  renderBookField = (propName, propText) => (
    <Grid container direction="row">
      <Typography variant="subtitle1" className={this.props.classes.propName}>
        { propName }
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        { propText }
      </Typography>
    </Grid>
  )

  render() {
    const { classes, book } = this.props;
    return (
      <main className={classes.main}>
        { book &&
          <Paper className={classes.paper}>
            { this.renderTitle(book.title) }
            <Grid container justify="center" spacing={24}>
              <Grid item>
                <img src={book.coverFileName ? (
                  `${process.env.API_URL}/files/books/${book.id}/covers/${book.coverFileName}`
                ) : (
                  bookImg
                ) }/>
              </Grid>
              <Grid item className={classes.fieldList}>
                { this.renderBookField('Автор:', book.author) }
                { this.renderBookField('Видавництво:', book.publisher) }
                { this.renderBookField('Рік видання:', book.publicationYear) }
                { this.renderBookField('Кількість сторінок:', book.pages) }
                { book.classifier && this.renderBookField('Класифікатор:', book.classifier) }
                { this.renderBookField('Опис:', book.description) }
                { book.notes && this.renderBookField('Примітки:', book.notes) }
                { this.renderBookField('Наявність в друкованому форматі:', book.availableOffline ? 'Так' : 'Ні') }
              </Grid>
            </Grid>
            { book.document &&
              <Button variant="outlined" color="secondary" className={classes.downloadButton}
                onClick={() => downloadFile(`${process.env.API_URL}${BOOK_DOCUMENT(book.id)}`)}
              >
                <DownloadIcon className={classes.leftIcon}/>
                Завантажити книгу
              </Button> }
          </Paper>
        }
      </main>
    );
  }
}

BookViewer.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    publisher: PropTypes.string.isRequired,
    publicationYear: PropTypes.number.isRequired,
    pages: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }),
  loadBook: PropTypes.func.isRequired,
};

export default withStyles(styles)(BookViewer);
