import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";

const emails = ["username@gmail.com", "user02@gmail.com"];

function SimpleDialog(props) {
  const { onClose, open, content } = props;

  const handleClose = () => {
    // onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open} sx={{ zIndex: 6000 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "10px",
          cursor: "pointer",
        }}
        onClick={() => onClose()}
      >
        <CloseIcon />
      </div>

      {content}
    </Dialog>
  );
}

export default function SimpleDialogDemo({ open, setOpen, content }) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div style={{ zIndex: 6000 }}>
      <SimpleDialog open={open} onClose={handleClose} content={content} />
    </div>
  );
}
