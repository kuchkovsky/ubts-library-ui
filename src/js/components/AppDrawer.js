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
import ProgressLink from '../containers/ProgressLinkContainer';
import * as routes from '../utils/routes';

const styles = {
  list: {
    width: 280,
  },
  title: {
    padding: 12,
    marginLeft: 65,
  },
};

const AppDrawer = ({ classes, open, toggleDrawer, authenticated, signOut }) => (
  <SwipeableDrawer open={open} onOpen={toggleDrawer} onClose={toggleDrawer}>
    <div tabIndex={0} role="button" onClick={toggleDrawer}>
      <div className={classes.list}>
        <Typography variant="h6" color="inherit" className={classes.title}>
            UBTS Library
        </Typography>
        <Divider />
        <List>
          <ListItem button key={routes.HOME} component={ProgressLink} to={routes.HOME}>
            <ListItemIcon>
              <HomeIcon/>
            </ListItemIcon>
            <ListItemText primary={routes.deriveHeaderFromPath(routes.HOME)}/>
          </ListItem>
          { authenticated &&
              <ListItem button key={routes.NEW_BOOK} component={Link} to={routes.NEW_BOOK}>
                <ListItemIcon>
                  <UploadBookIcon/>
                </ListItemIcon>
                <ListItemText primary={routes.deriveHeaderFromPath(routes.NEW_BOOK)}/>
              </ListItem> }
          { !authenticated &&
              <ListItem button key={routes.SIGN_IN} component={Link} to={routes.SIGN_IN}>
                <ListItemIcon>
                  <SignInIcon/>
                </ListItemIcon>
                <ListItemText primary={routes.deriveHeaderFromPath(routes.SIGN_IN)}/>
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
  signOut: PropTypes.func.isRequired,
};

export default withStyles(styles)(AppDrawer);
