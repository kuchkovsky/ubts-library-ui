import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import RequireAuth from '../containers/RequireAuth';
import BookList from '../containers/BookList';
import BookEditor from '../containers/bookEditor/BookEditor';
import SignIn from '../containers/signIn/SignIn';
import * as routes from '../utils/routes';

const SecuredBookEditor = RequireAuth(BookEditor, true);

const ContentRoutes = ({ authenticated }) => (
  <Switch>
    <Route exact path={routes.HOME} component={BookList}/>
    <Route exact path={`${routes.BOOKS}/:id`} component={SecuredBookEditor}/>
    <Route exact path={routes.SIGN_IN} render={() => (
      authenticated ? (
        <Redirect to={routes.HOME}/>
      ) : (
        <SignIn/>
      )
    )}/>
    <Redirect to={routes.HOME} />
  </Switch>
);

ContentRoutes.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

export default ContentRoutes;
