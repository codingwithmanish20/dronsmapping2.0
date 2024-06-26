import React, { useState, useCallback, useMemo } from "react";
import { List, IconButton, Tooltip } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import TransferOwnership from "./TransferOwnership";
import RemoveUser from "./RemoveUser";
import UserListItem from "./UserListItem";
import Modal from "../../components/ui/Modal";
import InputControl from "../../components/ui/InutControl";
import Switch from "@mui/material/Switch";
const UserList = () => {
  const [showTransferOwnershipModal, setShowTransferOwnership] =
    useState(false);
  const [showRemoveUserModal, setShowRemoveUserModal] = useState(false);
  const [showAddUserModal,setShowAddUserModal]=useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const [memberEmail, setMemberEmail] = useState("");
const [newUser,setNewUser]=useState({
  new_member_email:'',
  upload_permission:false,
  analysis_permission:false,
  report_permission:false
})
  const open = Boolean(anchorEl);

  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleShowTransferOwnership = useCallback(
    (email) => {
      setMemberEmail(email);
      setShowTransferOwnership(true);
      handleClose();
    },
    [handleClose]
  );

  const handleShowRemoveUserModal = useCallback(
    (email) => {
      setMemberEmail(email);
      setShowRemoveUserModal(true);
      handleClose();
    },
    [handleClose]
  );

  const onCloseTransferOwnership = useCallback(() => {
    setShowTransferOwnership(false);
    setMemberEmail("");
  }, []);

  const onCloseRemoveUser = useCallback(() => {
    setShowRemoveUserModal(false);
    setMemberEmail("");
  }, []);

  const data = useMemo(
    () => [
      { name: "Rohit Kumar", email: "rohit@gmail.com" },
      { name: "John Vick", email: "john@gmail.com" },
      { name: "Willium", email: "willium@gmail.com" },
      { name: "Jack Sparrow", email: "jackluim@jack.com" },
      // Add more users as needed
    ],
    []
  );
  const handleMemberEmailChange=(e)=>{
    const {name,value}=e.target
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }));
  }
  const handlePermissionChange=(e)=>{
    const {name,checked} = e.target
    setNewUser(prev => ({
      ...prev,
      [name]: checked
    }));
   

  }
  const handleAddUserSubmit=()=>{
    console.log('newUser',newUser)
  }

  return (
    <div className="shadow-lg p-4 flex-1">
      <div className="flex items-center justify-between">
        <h1>Users List</h1>
        <div>
          <Tooltip title="Add new user" arrow>
            <IconButton onClick={()=>setShowAddUserModal(true)}>
              <AddCircleOutlineIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <div className="h-[60vh] overflow-scroll">
        <List
          sx={{ width: "100%", maxWidth: "100%", bgcolor: "background.paper" }}
        >
          {data?.map((user) => (
            <UserListItem
              key={user.email}
              user={user}
              onMenuClick={handleClick}
              onTransferOwnership={handleShowTransferOwnership}
              onRemoveUser={handleShowRemoveUserModal}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            />
          ))}
        </List>
      </div>

      <TransferOwnership
        memberEmail={memberEmail}
        isOpen={showTransferOwnershipModal}
        onClose={onCloseTransferOwnership}
      />
      <RemoveUser
        memberEmail={memberEmail}
        isOpen={showRemoveUserModal}
        onClose={onCloseRemoveUser}
      />
      <Modal isOpen={showAddUserModal}   submitText={"Add"} onClick={handleAddUserSubmit} onClose={()=>setShowAddUserModal(false)}>
        <div className="w-[440px]">
          <InputControl placeholder={"Enter email"} name="new_member_email" onChange={handleMemberEmailChange} />
          <div className="mt-4">
            <div className="flex items-center justify-between ">
              <label>Upload Permission</label>
              <Switch name="upload_permission"  onChange={handlePermissionChange} />
            </div>
            <div className="flex  items-center justify-between">
              <label>Analysis Permission</label>
              <Switch  name="analysis_permission" value={newUser.analysis_permission} onChange={handlePermissionChange} />
            </div>
            <div className="flex items-center justify-between">
              <label>Report  Permission</label>
              <Switch name="report_permission" value={newUser.report_permission} onChange={handlePermissionChange} />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserList;
