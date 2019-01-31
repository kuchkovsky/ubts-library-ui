import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import RequireAuth from '../containers/RequireAuth';
import BookList from '../containers/BookList';
import BookEditor from '../containers/bookEditor/BookEditor';
import SignIn from '../containers/signIn/SignIn';
import { HOME, BOOK_EDITOR, BOOK_VIEWER, SIGN_IN } from '../utils/routes';
import BookViewer from '../containers/BookViewer';

const SecuredBookEditor = RequireAuth(BookEditor, true);

const ContentRoutes = ({ authenticated }) => (
  <Switch>
    <Route exact path={HOME} component={BookList}/>
    <Route exact path={`${BOOK_EDITOR}/:id`} component={SecuredBookEditor}/>
    <Route exact path={`${BOOK_VIEWER}/:id`} component={BookViewer}/>
    <Route exact path={SIGN_IN} render={() => (
      authenticated ? (
        <Redirect to={HOME}/>
      ) : (
        <SignIn/>
      )
    )}/>
    <Redirect to={HOME} />
  </Switch>
);

ContentRoutes.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

export default ContentRoutes;
