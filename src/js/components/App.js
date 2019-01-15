import React from 'react';
import { registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import CssBaseline from '@material-ui/core/CssBaseline';
import Content from '../containers/Content';
import AppToolbar from '../containers/AppToolbar';
import AppDrawer from '../containers/AppDrawer';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

registerPlugin(FilePondPluginFileValidateType);
registerPlugin(FilePondPluginImagePreview);

const App = () => (
  <React.Fragment>
    <CssBaseline/>
    <AppToolbar/>
    <AppDrawer/>
    <Content/>
  </React.Fragment>
);

export default App;
