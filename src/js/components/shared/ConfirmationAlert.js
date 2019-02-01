import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = props => (
  <Slide direction="up" {...props}/>
);

const ConfirmationAlert = ({ title, showAlert, onConfirm, onReject }) => (
  <div>
    <Dialog
      open={showAlert}
      TransitionComponent={Transition}
      keepMounted
      onClose={onReject}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        { title }
      </DialogTitle>
      <DialogActions>
        <Button onClick={onReject} color="primary">
          Ні
        </Button>
        <Button onClick={onConfirm} color="primary">
          Так
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

ConfirmationAlert.propTypes = {
  title: PropTypes.string.isRequired,
  showAlert: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
};

export default ConfirmationAlert;
