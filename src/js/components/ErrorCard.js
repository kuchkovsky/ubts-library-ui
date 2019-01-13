import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    backgroundColor: 'crimson',
    maxWidth: 400,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

const ErrorCard = ({ classes, errorData }) => (
  <Card className={classes.root}>
    <CardActionArea>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Помилка
        </Typography>
        <Typography component="p">
          { errorData.message }
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button variant="outlined" onClick={errorData.retryAction}>
        Спробувати знову
      </Button>
    </CardActions>
  </Card>
);

ErrorCard.propTypes = {
  classes: PropTypes.object.isRequired,
  errorData: PropTypes.shape({
    message: PropTypes.string.isRequired,
    retryAction: PropTypes.func.isRequired,
  }).isRequired,
};

export default withStyles(styles)(ErrorCard);
