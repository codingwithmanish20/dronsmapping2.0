import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CANCEL, CONFIRM } from "../../constant/constant";
import api from "../../services";
import { errorHandler } from "../../helper/handleError";
import useToast from "../../hooks/useToast";
import { CircularProgress } from "@mui/material";
import { blue } from "@mui/material/colors";
const RemoveUser = ({ isOpen, onClose, memberEmail }) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const handleRemoveUser = async () => {
    setLoading(true);
    const payload = {
      member_email: memberEmail,
    };
    try {
      const res = await api.user.removeUser(payload);
      setLoading(false);
      onClose();
    } catch (error) {
      setLoading(false);
      const message = errorHandler(error);
      toast(message, "error");
      onClose();
      console.error("Error:: while calling transfer ownership api", error);
    }
  };
  return (
    <div className="mt-6">
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>Confirmation </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove{" "}
            <span className="font-semibold text-black">{memberEmail}</span> from
            the project? This will remove their access and permissions.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            {CANCEL}
          </Button>
          <Button
            variant="contained"
            disabled={loading}
            onClick={handleRemoveUser}
          >
            {" "}
            {loading && (
              <CircularProgress size={22} sx={{ color: blue[500], mr: 2 }} />
            )}{" "}
            {CONFIRM}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RemoveUser;
