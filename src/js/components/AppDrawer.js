import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import UploadBookIcon from '@material-ui/icons/AddCircle';
import SignInIcon from '@material-ui/icons/AccountCircle';
import SignOutIcon from '@material-ui/icons/ExitToApp';
import ProgressLink from '../containers/ProgressLink';
import {
  deriveHeaderFromPath,
  HOME,
  BOOK_EDITOR_NEW_BOOK,
  SIGN_IN,
} from '../utils/routes';

const styles = {
  list: {
    width: 280,
  },
  title: {
    padding: 12,
    marginLeft: 65,
  },
};

const AppDrawer = ({ classes, open, toggleDrawer, authenticated, admin, signOut }) => (
  <SwipeableDrawer open={open} onOpen={toggleDrawer} onClose={toggleDrawer}>
    <div tabIndex={0} role="button" onClick={toggleDrawer}>
      <div className={classes.list}>
        <Typography variant="h6" color="inherit" className={classes.title}>
            UBTS Library
        </Typography>
        <Divider />
        <List>
          <ListItem button key={HOME} component={ProgressLink} to={HOME}>
            <ListItemIcon>
              <HomeIcon/>
            </ListItemIcon>
            <ListItemText primary={deriveHeaderFromPath(HOME)}/>
          </ListItem>
          { admin &&
              <ListItem button key={BOOK_EDITOR_NEW_BOOK}
                component={Link} to={BOOK_EDITOR_NEW_BOOK}>
                <ListItemIcon>
                  <UploadBookIcon/>
                </ListItemIcon>
                <ListItemText primary={deriveHeaderFromPath(BOOK_EDITOR_NEW_BOOK)}/>
              </ListItem> }
          { !authenticated &&
              <ListItem button key={SIGN_IN} component={Link} to={SIGN_IN}>
                <ListItemIcon>
                  <SignInIcon/>
                </ListItemIcon>
                <ListItemText primary={deriveHeaderFromPath(SIGN_IN)}/>
              </ListItem> }
          { authenticated &&
              <ListItem button key="SignOut" onClick={signOut}>
                <ListItemIcon>
                  <SignOutIcon/>
                </ListItemIcon>
                <ListItemText primary="Вийти з акаунту"/>
              </ListItem> }
        </List>
      </div>
    </div>
  </SwipeableDrawer>
);

AppDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  admin: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default withStyles(styles)(AppDrawer);
