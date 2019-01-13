import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import SnackbarMessage from '../shared/SnackbarMessage';
import { formStyles } from '../../styles/form';
import Form from './Form';

const styles = formStyles(400, theme => ({
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
}));

const SignIn = props => {
  const { classes, auth } = props;

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Вхід в систему
        </Typography>
        <Form pending={auth.pending} {...props}/>
      </Paper>
      <div className={classes.infoMessageWrapper}>
        { auth.error &&
          <SnackbarMessage variant="error" message="Неправильний логін або пароль"/> }
      </div>
    </main>
  );
};

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(SignIn);
