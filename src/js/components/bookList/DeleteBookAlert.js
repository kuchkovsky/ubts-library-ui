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

const DeleteBookAlert = ({ deleteAlert: { show, bookId }, deleteBook, hideDeleteAlert }) => {
  const onDelete = () => {
    deleteBook(bookId);
    hideDeleteAlert();
  };

  return (
    <div>
      <Dialog
        open={show}
        TransitionComponent={Transition}
        keepMounted
        onClose={hideDeleteAlert}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Ви справді бажаєте видалити дану книгу?
        </DialogTitle>
        <DialogActions>
          <Button onClick={hideDeleteAlert} color="primary">
              Ні
          </Button>
          <Button onClick={onDelete} color="primary">
              Так
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

DeleteBookAlert.propTypes = {
  deleteAlert: PropTypes.shape({
    show: PropTypes.bool.isRequired,
    bookId: PropTypes.string,
  }).isRequired,
  hideDeleteAlert: PropTypes.func.isRequired,
  deleteBook: PropTypes.func.isRequired,
};

export default DeleteBookAlert;
