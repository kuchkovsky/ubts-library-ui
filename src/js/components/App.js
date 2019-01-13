import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import ContentContainer from '../containers/ContentContainer';
import AppToolbarContainer from '../containers/AppToolbarContainer';
import AppDrawerContainer from '../containers/AppDrawerContainer';

const App = () => (
  <React.Fragment>
    <CssBaseline/>
    <AppToolbarContainer/>
    <AppDrawerContainer/>
    <ContentContainer/>
  </React.Fragment>
);

export default App;
