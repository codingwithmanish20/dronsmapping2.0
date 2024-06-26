import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import React from "react";
import { formatName } from "../../helper/formatName";
import { deepPurple } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const UserListItem = ({
  user,
  onMenuClick,
  onTransferOwnership,
  onRemoveUser,
  anchorEl,
  open,
  onClose,
}) => (
  <ListItem className="border-b w-full">
    <ListItemAvatar>
      <Avatar
        sx={{ bgcolor: deepPurple[500], width: 32, height: 32, fontSize: 14 }}
      >
        {formatName(user?.name)}
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary={user.name} secondary={user.email} />
    <IconButton
      id="basic-button"
      aria-controls={open ? "basic-menu" : undefined}
      aria-haspopup="true"
      aria-expanded={open ? "true" : undefined}
      onClick={onMenuClick}
    >
      <MoreVertIcon />
    </IconButton>
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      MenuListProps={{ "aria-labelledby": "basic-button" }}
    >
      <MenuItem onClick={() => onTransferOwnership(user.email)}>
        Transfer Ownership
      </MenuItem>
      <MenuItem onClick={() => onRemoveUser(user.email)}>Remove User</MenuItem>
    </Menu>
  </ListItem>
);

export default UserListItem;
