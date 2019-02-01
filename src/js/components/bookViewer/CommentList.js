import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Comment from './Comment';

const styles = () => ({
  paper: {
    marginTop: 10,
    padding: 15,
  },
  title: {
    padding: '15px 0 15px 15px',
  },
  commentForm: {
    marginBottom: 30,
  },
  sendButton: {
    margin: '0 0 10px 10px',
  },
  listMessageGrid: {
    paddingTop: 20,
    paddingBottom: 20,
  },
});

class CommentList extends React.Component {
  onChangeHelper = e => this.props.changeCommentInput(e.target.value);

  isCommentEmpty = () => this.props.comment.length === 0;

  sendComment = () => this.props.sendComment(this.props.book.id);

  renderCommentForm = () => {
    const { classes, comment } = this.props;
    return (
      <Card className={classes.commentForm}>
        <CardContent>
          <TextField
            name="comment"
            helperText="Введіть свій коментар"
            label="Додати коментар"
            value={comment}
            onChange={this.onChangeHelper}
            fullWidth
            multiline
            variant="outlined"
            margin="normal"
          />
        </CardContent>
        <CardActions>
          <Button
            className={classes.sendButton}
            variant="outlined"
            color="primary"
            disabled={this.isCommentEmpty()}
            onClick={this.sendComment}
          >
            Надіслати
          </Button>
        </CardActions>
      </Card>
    );
  }

  hasDeletePermission = author => {
    const { admin, login } = this.props;
    return admin || author === login;
  }

  render() {
    const { classes, book, deleteComment } = this.props;

    const { comments } = book;
    return (
      <Paper className={classes.paper}>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">
          Коментарі
        </Typography>
        { this.renderCommentForm() }
        { comments.map(comment => (
          <Comment showDelete={this.hasDeletePermission(comment.user.login)}
            onDelete={deleteComment} data={comment} key={comment.id}/>
        ))}
        { !comments.length &&
            <Grid container justify="center" className={classes.listMessageGrid}>
              <Typography variant="subtitle1" color="inherit">
                Коментарів немає. Залишіть свій відгук :)
              </Typography>
            </Grid>
        }
      </Paper>
    );
  }
}

CommentList.propTypes = {
  classes: PropTypes.object.isRequired,
  book: PropTypes.object.isRequired,
  admin: PropTypes.bool.isRequired,
  login: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  changeCommentInput: PropTypes.func.isRequired,
  sendComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

export default withStyles(styles)(CommentList);
