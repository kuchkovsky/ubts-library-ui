import React from 'react';
import PropTypes from 'prop-types';
import { FilePond } from 'react-filepond';
import { Field } from 'redux-form/immutable';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import ReduxTextField from '../shared/ReduxTextField';
import { BOOK_DOCUMENTS } from '../../utils/apiEndpoints';
import { generateAuthHeader } from '../../utils/auth';

const styles = {
  root: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  listItem: {
    padding: '0 50px 0 0',
  },
};

const documentUrl = `${process.env.API_URL}${BOOK_DOCUMENTS}`;

const DocumentPicker = props => {
  const { classes, document, documentUploading, documentUploaded } = props;

  const authHeaders = {
    Authorization: generateAuthHeader(),
  };
  const serverConfig = {
    url: documentUrl,
    process: {
      headers: authHeaders,
    },
    revert: {
      headers: authHeaders,
    },
  };

  const onFinishUpload = (error, file) => {
    if (!error) {
      props.change('uploadedDocument', JSON.parse(file.serverId).fileName);
    }
    documentUploaded();
  };

  const onRemoveUploadedDocument = () => props.change('uploadedDocument', '');

  const onRemoveDocument = () => props.change('document', '');

  return (
    <div className={classes.root}>
      <Typography className={classes.title} component="h1" variant="h6">
        Електронна книга
      </Typography>
      { document &&
        <List>
          <ListItem className={classes.listItem}>
            <Field name="document" label="Ім'я файлу"
              component={ReduxTextField}
              fullWidth variant="outlined" margin="normal" disabled/>
            <ListItemSecondaryAction>
              <IconButton aria-label="Delete" onClick={onRemoveDocument}>
                <DeleteIcon/>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List> }
      { !document &&
        <FilePond
          server={serverConfig}
          onaddfile={documentUploading}
          onprocessfile={onFinishUpload}
          onremovefile={onRemoveUploadedDocument}
        /> }
    </div>
  );
};

DocumentPicker.propTypes = {
  classes: PropTypes.object.isRequired,
  document: PropTypes.string,
  documentUploading: PropTypes.func.isRequired,
  documentUploaded: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
};

export default withStyles(styles)(DocumentPicker);
