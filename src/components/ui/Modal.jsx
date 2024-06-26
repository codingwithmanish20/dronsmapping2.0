import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { CANCEL } from "../../constant/constant";
import { CircularProgress } from "@mui/material";
import { blue } from "@mui/material/colors";
const Modal = ({ isOpen, onClose, onClick, loading, submitText, children }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Confirmation </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          {CANCEL}
        </Button>
        <Button variant="contained" disabled={loading} onClick={onClick}>
          {" "}
          {loading && (
            <CircularProgress size={22} sx={{ color: blue[500], mr: 2 }} />
          )}{" "}
          {submitText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
