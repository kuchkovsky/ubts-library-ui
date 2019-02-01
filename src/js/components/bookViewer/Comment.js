import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
  card: {
    marginTop: 10,
  },
  avatar: {
    backgroundColor: red[500],
  },
  actions: {
    display: 'flex',
  },
};

const Comment = ({ classes, data, showDelete, onDelete }) => (
  <Card className={classes.card}>
    <CardHeader
      avatar={
        <Avatar aria-label="Recipe" className={classes.avatar}>
          { `${data.user.lastName.charAt(0)}${data.user.firstName.charAt(0)}` }
        </Avatar>
      }
      title={`${data.user.lastName} ${data.user.firstName}`}
      subheader={data.dateTime}
    />
    <CardContent>
      <Typography variant="subtitle1">
        { data.text }
      </Typography>
    </CardContent>
    { showDelete &&
      <CardActions className={classes.actions} disableActionSpacing>
        <IconButton aria-label="Delete" onClick={() => onDelete(data.id)}>
          <DeleteIcon/>
        </IconButton>
      </CardActions>
    }
  </Card>
);

Comment.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    }).isRequired,
    text: PropTypes.string.isRequired,
    dateTime: PropTypes.string.isRequired,
  }).isRequired,
  showDelete: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default withStyles(styles)(Comment);
