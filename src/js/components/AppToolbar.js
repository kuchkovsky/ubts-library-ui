import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import AddBookIcon from '@material-ui/icons/AddCircleOutlined';
import SignInIcon from '@material-ui/icons/AccountCircleOutlined';
import SignOutIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import ProgressLink from '../containers/ProgressLink';
import {
  deriveHeaderFromPath,
  HOME,
  BOOK_EDITOR_NEW_BOOK,
  SIGN_IN,
} from '../utils/routes';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  wideScreen: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
});

const LocationAwareButton = props => (
  <React.Fragment>
    { props.from !== props.to &&
      <Button {...props}>
        {props.children}
        {props.text}
      </Button> }
  </React.Fragment>
);

LocationAwareButton.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  children: PropTypes.object,
};

const AppToolbar = ({ classes, toggleDrawer, location, authenticated, admin, signOut }) => (
  <AppBar position="static" className={classes.root}>
    <Toolbar>
      <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" color="inherit" className={classes.grow}>
        { deriveHeaderFromPath(location.pathname) }
      </Typography>
      <div className={classes.wideScreen}>
        <LocationAwareButton text={deriveHeaderFromPath(HOME)} color="inherit"
          component={ProgressLink} from={location.pathname} to={HOME} delay={0}>
          <HomeIcon className={classes.leftIcon}/>
        </LocationAwareButton>
        { admin &&
          <LocationAwareButton text={deriveHeaderFromPath(BOOK_EDITOR_NEW_BOOK)} color="inherit"
            component={Link} from={location.pathname} to={BOOK_EDITOR_NEW_BOOK}>
            <AddBookIcon className={classes.leftIcon}/>
          </LocationAwareButton>
        }
        {
          authenticated ? (
            <Button color="inherit" onClick={signOut}>
              <SignOutIcon className={classes.leftIcon}/>
              Вийти з акаунту
            </Button>
          ) : (
            <LocationAwareButton text={deriveHeaderFromPath(SIGN_IN)} color="inherit"
              component={Link} from={location.pathname} to={SIGN_IN}>
              <SignInIcon className={classes.leftIcon}/>
            </LocationAwareButton>
          )
        }
      </div>
    </Toolbar>
  </AppBar>
);

AppToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
  authenticated: PropTypes.bool.isRequired,
  admin: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default withStyles(styles)(AppToolbar);
