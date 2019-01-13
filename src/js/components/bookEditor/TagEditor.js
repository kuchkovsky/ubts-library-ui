import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import ReduxTextField from '../shared/ReduxTextField';

const styles = {
  root: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: {
    textAlign: 'center',
  },
  listEmptyMessage: {
    textAlign: 'center',
    padding: 10,
  },
  listItem: {
    padding: '0 50px 0 0',
  },
};

const TagEditor = ({ classes, fields }) => {
  const fieldList = fields.map((value, index) => (
    <ListItem key={value} className={classes.listItem}>
      <Field name={value} label={`Тег ${index + 1}`}
        component={ReduxTextField}
        fullWidth variant="outlined" margin="normal"/>
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete" onClick={() => fields.remove(index)}>
          <DeleteIcon/>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  ));
  return (
    <div className={classes.root}>
      <Typography className={classes.title} component="h1" variant="h6">
        Теги
      </Typography>
      <List>
        { fieldList }
        { !fieldList.size &&
          <Typography className={classes.listEmptyMessage} variant="subtitle1" color="inherit">
            Cписок пустий
          </Typography>
        }
      </List>
      <Button fullWidth variant="outlined" color="secondary" onClick={() => fields.push()}>
        Додати тег
      </Button>
    </div>
  );
};

TagEditor.propTypes = {
  classes: PropTypes.object.isRequired,
  fields: PropTypes.object.isRequired,
};

export default withStyles(styles)(TagEditor);
