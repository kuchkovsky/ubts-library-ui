import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import RequireAuthContainer from '../containers/RequireAuthContainer';
import BookListContainer from '../containers/BookListContainer';
import BookEditorContainer from '../containers/BookEditorContainer';
import SignInContainer from '../containers/SignInContainer';
import * as routes from '../utils/routes';

const SecuredBookEditorContainer = RequireAuthContainer(BookEditorContainer);

const ContentRoutes = ({ authenticated }) => (
  <Switch>
    <Route exact path={routes.HOME} component={BookListContainer}/>
    <Route exact path={`${routes.BOOKS}/:id`} component={SecuredBookEditorContainer}/>
    <Route exact path={routes.SIGN_IN} render={() => (
      authenticated ? (
        <Redirect to={routes.HOME}/>
      ) : (
        <SignInContainer/>
      )
    )}/>
    <Redirect to={routes.HOME} />
  </Switch>
);

ContentRoutes.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

export default ContentRoutes;
