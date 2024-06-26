import React, { useState } from "react";
import api from "../../services";
import { errorHandler } from "../../helper/handleError";
import useToast from "../../hooks/useToast";
import ConfirmationAlert from "../../shared//ConfirmationAlert";
import { useQueryClient } from "react-query";
import {
  CONFIRMATION_MESAGE,
  PROJECT_DACTIVATION_SUCCESS,
  ACTIVATE_CONFIRMATION_MESAGE,
  PROJECT_ACTIVATION_SUCCESS,
} from "../../constant/constant";
import { formatDate } from "../../helper/formateDate";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
const ProjectDetails = ({
  project_name,
  category,
  decription,
  trashed_time,
  created_at,
  updated_at,
}) => {
  const [showAlert, setShowAlert] = useState(false);
  const [showActivateAlert, setShowActivateAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const queryClient = useQueryClient();
  const handleDeactivateConfirm = async () => {
    setIsLoading(true);
    try {
      const res = await api.user.deactiveProject();
      if (res.status == 204) {
        setIsLoading(false);
        setShowAlert(false);
        toast(PROJECT_DACTIVATION_SUCCESS, "success");
        queryClient.invalidateQueries(["getProjectDetails"]);
      }
    } catch (error) {
      setIsLoading(false);
      setShowAlert(false);
      console.error("Error::while deactivating project", error);
      const message = errorHandler(error);
      toast(message, "error");
    }
  };
  const handleActivateConfirm = async () => {
    setIsLoading(true);
    try {
      const res = await api.user.activeProject();
      if (res.status == 201) {
        setIsLoading(false);
        setShowActivateAlert(false);
        toast(PROJECT_ACTIVATION_SUCCESS, "success");
        queryClient.invalidateQueries(["getProjectDetails"]);
      }
    } catch (error) {
      setShowActivateAlert(false);
      setIsLoading(false);
      console.error("Error::while deactivating project", error);
      const message = errorHandler(error);
      toast(message, "error");
    }
  };

  const handleShowActivateConfirm = () => {
    setShowActivateAlert(true);
  };
  const onShowDeactivateAlert = () => {
    setShowAlert(true);
  };
  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  return (
    <div>
      <main>
        <div className="bg-white shadow-lg w-[50%] min-w-[560px] p-3 border  border-softgray relative">
          <p className="text-sm">
            Project Name : <span className="text-muted">{project_name}</span>
          </p>
          <p className="text-sm">
            Description : <span className="text-muted">{decription}</span>
          </p>
          <p className="text-sm">
            Category :{" "}
            <span className="bg-yellow-400 text-white rounded-full px-4">
              {category}
            </span>
          </p>
          <div className="flex gap-4">
            <p className="text-sm mt-4 flex flex-col gap-1">
              {" "}
              Created At :{" "}
              <span className=" bg-gray-200 px-4 py-1 rounded-full flex  gap-2 items-center">
                <AccessTimeIcon /> {formatDate(created_at)}
              </span>
            </p>
            <p className="text-sm mt-4 flex flex-col gap-1">
              Updated At :{" "}
              <span className=" bg-gray-200 px-4 py-1 rounded-full flex gap-2 items-center">
                {" "}
                <AccessTimeIcon /> {formatDate(created_at)}
              </span>
            </p>
          </div>

          <div className="absolute top-2 right-1">
            <Tooltip title="Edit details" arrow>
              <IconButton>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <button
              onClick={
                trashed_time ? handleShowActivateConfirm : onShowDeactivateAlert
              }
              className={`bg-background  cursor-pointer text-white rounded-full px-3 text-xs py-1 transition-transform active:scale-[0.9] `}
            >
              {trashed_time ? "Activate" : "Deactivate"}{" "}
            </button>
          </div>
        </div>
      </main>

      <ConfirmationAlert
        isLoading={isLoading}
        message={CONFIRMATION_MESAGE}
        open={showAlert}
        onClose={handleCloseAlert}
        onConfirm={handleDeactivateConfirm}
      />
      <ConfirmationAlert
        isLoading={isLoading}
        message={ACTIVATE_CONFIRMATION_MESAGE}
        open={showActivateAlert}
        onClose={() => setShowActivateAlert(false)}
        onConfirm={handleActivateConfirm}
      />
    </div>
  );
};

export default ProjectDetails;
