import React, { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { getBase64 } from "../../utils";
import * as UserService from "../../service/UserService";
import { useMutationHook } from "../../hooks/useMutationHook";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { useSelector } from "react-redux";
import {
  Alert,
  Avatar,
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Snackbar,
  TextField,
} from "@mui/material";
import { useQuery } from "react-query";
import TableComponent from "../TableComponent/TableComponent";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const AdminUser = () => {
  const [open, setOpen] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [idUser, setIdUser] = useState("");
  const [openComfirm, setOpenComfirm] = useState(false);
  const [idUserDelete, setIdUserDelete] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setOpenComfirm(false);
    setIdUserDelete("");
    setIdUser("");
    setStateUser(inittial());
  };

  const [openMess, setOpenMess] = useState(false);

  const handleCloseMess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenMess(false);
  };

  const inittial = () => ({
    name: "",
    email: "",
    phone: "",
    avatar: "",
    address: "",
    isAdmin: false,
    password: "",
  });

  const [stateUser, setStateUser] = useState(inittial());
  console.log(stateUser);

  const handleOnchange = (e) => {
    setStateUser({
      ...stateUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangeAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file);
    }
    console.log(file.preview);
    setStateUser({
      ...stateUser,
      avatar: file.preview,
    });
  };

  const getAllUser = async () => {
    const res = await UserService.getAllUser();
    return res;
  };

  const fetchUser = useQuery(["users"], getAllUser);
  const { isLoading: loadingUser, data: users } = fetchUser;

  //listproduct

  const handleEditUser = async (idUser) => {
    const res = await UserService.getDetailsUser(idUser);
    if (res?.data) {
      setStateUser(res.data);
    }
    setLoadingModal(false);
  };

  useEffect(() => {
    if (idUser) {
      setLoadingModal(true);
      setOpen(true);
      handleEditUser(idUser);
    }
  }, [idUser]);

  const mutationUpdateUser = useMutationHook((data) => {
    const { id, token, ...rests } = data;
    const res = UserService.updateUser(id, rests, token);
    return res;
  });

  const {
    isLoading: isLoadingUpated,
    isSuccess: isSuccessUpdated,
    data: dataUpdated,
  } = mutationUpdateUser;

  const user = useSelector((state) => state.user);

  const handleUpdateUser = () => {
    mutationUpdateUser.mutate(
      {
        id: idUser,
        token: user?.access_token,
        ...stateUser,
      },
      {
        onSettled: () => {
          fetchUser.refetch();
        },
      }
    );
  };

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "Ok") {
      handleClose();
      setOpenMess(true);
    }
  }, [isSuccessUpdated, dataUpdated]);

  const columns = [
    { field: "id", headerName: "QTT", width: 50 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "address", headerName: "Address", width: 250 },
    { field: "isAdmin", headerName: "Admin", width: 80 },
    {
      field: "avatar",
      headerName: "Avatar",
      width: 150,
      renderCell: (params) => <Avatar alt={params.value} src={params.value} />,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <>
          <EditOutlinedIcon
            onClick={() => setIdUser(params.row._id)}
            style={{ cursor: "pointer", marginRight: 10, color: "blue" }}
          />
          <DeleteOutlineOutlinedIcon
            onClick={() => setIdUserDelete(params.row._id)}
            style={{ cursor: "pointer", color: "red" }}
          />
        </>
      ),
    },
  ];

  let id = 0;

  const rows =
    users?.data?.length &&
    users?.data?.map((user) => {
      return {
        ...user,
        id: ++id,
        _id: user._id,
      };
    });

  //delted

  useEffect(() => {
    if (idUserDelete) {
      setOpenComfirm(true);
    }
  }, [idUserDelete]);

  const mutationDeletedUser = useMutationHook((data) => {
    const { id, token } = data;
    const res = UserService.deleteUser(id, token);
    return res;
  });

  const {
    isLoading: isLoadingDeleted,
    isSuccess: isSuccessDeteted,
    data: dataDeleted,
  } = mutationDeletedUser;

  const [openMessDeleted, setOpenMessDeleted] = useState(false);

  useEffect(() => {
    if (isSuccessDeteted && dataDeleted?.status === "Ok") {
      handleClose();
      setOpenMessDeleted(true);
    }
  }, [isSuccessDeteted, dataDeleted]);

  const handleDeleteUser = () => {
    mutationDeletedUser.mutate(
      {
        id: idUserDelete,
        token: user?.access_token,
      },
      {
        onSettled: () => {
          fetchUser.refetch();
        },
      }
    );
  };

  return (
    <div>
      {openMess && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={true}
          autoHideDuration={2000}
          onClose={handleCloseMess}
        >
          <Alert
            onClose={handleCloseMess}
            severity="success"
            sx={{ width: "100%" }}
          >
            This is a success message!
          </Alert>
        </Snackbar>
      )}
      <div>User Manager</div>
      <div style={{ marginTop: "20px" }}>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {loadingModal ? (
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 600,
                bgcolor: "#f5f5f5",
                boxShadow: 24,
                p: 4,
              }}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              <CircularProgress sx={{ marginLeft: "20px" }} size="25px" />
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 600,
                  bgcolor: "#f5f5f5",
                  boxShadow: 24,
                  p: 4,
                }}
                id="modal-modal-title"
                variant="h6"
                component="h2"
              >
                <div
                  style={{
                    marginBottom: "15px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  Edit User
                  <span>
                    <CancelPresentationIcon
                      sx={{ marginRight: 4, cursor: "pointer" }}
                      onClick={handleClose}
                    />
                  </span>
                </div>
                <Avatar
                  src={stateUser?.avatar && stateUser?.avatar}
                  alt="Remy Sharp"
                  sx={{ width: 100, height: 100 }}
                />
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  style={{ marginBottom: 20, marginTop: 20 }}
                >
                  Upload file
                  <input
                    style={{
                      clip: "rect(0 0 0 0)",
                      clipPath: "inset(50%)",
                      height: 1,
                      overflow: "hidden",
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      whiteSpace: "nowrap",
                      width: 1,
                    }}
                    onChange={handleOnChangeAvatar}
                    type="file"
                  />
                </Button>

                <Grid container>
                  <Grid item xs={6}>
                    <TextField
                      sx={{
                        width: {
                          xs: "90%",
                          md: "90%",
                          marginBottom: "20px",
                        },
                      }}
                      value={stateUser["name"]}
                      onChange={handleOnchange}
                      name="name"
                      label="Name"
                    />
                    <TextField
                      sx={{
                        width: { xs: "90%", md: "90%", marginBottom: "20px" },
                      }}
                      value={stateUser["email"]}
                      onChange={handleOnchange}
                      name="email"
                      type="text"
                      label="Email"
                    />
                    <TextField
                      sx={{
                        width: { xs: "90%", md: "90%", marginBottom: "20px" },
                      }}
                      value={stateUser["phone"]}
                      onChange={handleOnchange}
                      name="phone"
                      type="text"
                      label="Phone"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      sx={{
                        width: { xs: "90%", md: "90%", marginBottom: "20px" },
                      }}
                      value={stateUser["address"]}
                      onChange={handleOnchange}
                      name="address"
                      type="text"
                      label="Address"
                    />

                    <TextField
                      sx={{
                        width: { xs: "90%", md: "90%", marginBottom: "20px" },
                      }}
                      value={stateUser["isAdmin"]}
                      onChange={handleOnchange}
                      name="isAdmin"
                      type="text"
                      label="Admin"
                    />
                  </Grid>
                </Grid>

                <hr style={{ marginRight: 30, marginBottom: "20px" }} />
                <span style={{ display: "flex", justifyContent: "end" }}>
                  <Button
                    variant="outlined"
                    sx={{
                      height: "40px",
                      width: "100px",
                      marginRight: "10px",
                    }}
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  <span style={{ cursor: "not-allowed" }}>
                    <Button
                      disabled={
                        !stateUser.name ||
                        !stateUser.email ||
                        !stateUser.phone ||
                        !stateUser.isAdmin ||
                        !stateUser.address ||
                        !stateUser.avatar
                      }
                      variant="outlined"
                      sx={{
                        height: "40px",
                        width: "100px",
                        marginRight: "30px",
                      }}
                      onClick={handleUpdateUser}
                    >
                      {isLoadingUpated ? (
                        <CircularProgress
                          sx={{ marginLeft: "20px" }}
                          size="25px"
                        />
                      ) : (
                        <>Update</>
                      )}
                    </Button>
                  </span>
                </span>
              </Box>
            </>
          )}
        </Modal>
        <Dialog open={openComfirm} onClose={handleClose}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            Are you sure you want to remove this product
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button color="error" onClick={handleDeleteUser} autoFocus>
              {isLoadingDeleted ? (
                <CircularProgress sx={{ marginLeft: "20px" }} size="25px" />
              ) : (
                <>AGREE</>
              )}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div style={{ marginTop: "20px" }}>
        <TableComponent rows={rows} columns={columns} isLoading={loadingUser} />
      </div>
    </div>
  );
};

export default AdminUser;
