import React, { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { getBase64 } from "../../utils";
import * as ProductService from "../../service/ProductService";
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

const AdminProduct = () => {
  const [open, setOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [idProduct, setIdProduct] = useState("");
  const [openComfirm, setOpenComfirm] = useState(false);
  const [idProductDelete, setIdProductDelete] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setOpenDetail(false);
    setOpenComfirm(false);
    setIdProductDelete("");
    setIdProduct("");
    setStateProduct(inittial());
  };

  const [openMess, setOpenMess] = useState(false);

  const handleCloseMess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenMess(false);
    setOpenMessDeleted(false);
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const inittial = () => ({
    name: "",
    price: "",
    image: "",
    type: "",
    countInStock: "",
    newType: "",
    discount: "",
  });

  const [stateProduct, setStateProduct] = useState(inittial());

  const mutation = useMutationHook((data) => {
    const { name, price, image, type, countInStock, discount } = data;
    const res = ProductService.createProduct({
      name,
      price,
      image,
      type,
      countInStock,
      discount,
    });
    return res;
  });

  const { isLoading, isSuccess, data, isError } = mutation;

  const handleOnchange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangeImage = async (e) => {
    const file = e.target.files[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview,
    });
  };

  const getAllProduct = async () => {
    const res = await ProductService.getAllProduct();
    return res;
  };

  const fetchProduct = useQuery(["products"], getAllProduct);
  const { isLoading: loadingProduct, data: products } = fetchProduct;

  const handleAddProduct = () => {
    mutation.mutate(
      {
        ...stateProduct,
      },
      {
        onSettled: () => {
          fetchProduct.refetch();
        },
      }
    );
  };

  useEffect(() => {
    if (isSuccess && data?.status === "True") {
      handleClose();
      setOpenMess(true);
    } else if (data?.status === "Err") {
    }
  }, [isSuccess, isError]);

  //listproduct

  const handleEditProduct = async (idProduct) => {
    const res = await ProductService.getDetailProduct(idProduct);
    if (res?.data) {
      setStateProduct(res.data);
    }
    setLoadingModal(false);
  };

  useEffect(() => {
    if (idProduct) {
      setLoadingModal(true);
      setOpenDetail(true);
      setOpen(true);
      handleEditProduct(idProduct);
    }
  }, [idProduct]);

  const mutationUpdate = useMutationHook((data) => {
    const { id, token, ...rests } = data;
    const res = ProductService.updateProduct(id, rests, token);
    return res;
  });

  const {
    isLoading: isLoadingUpated,
    isSuccess: isSuccessUpdated,
    data: dataUpdated,
  } = mutationUpdate;

  const user = useSelector((state) => state.user);

  const handleUpdateProduct = () => {
    mutationUpdate.mutate(
      {
        id: idProduct,
        token: user?.access_token,
        ...stateProduct,
      },
      {
        onSettled: () => {
          fetchProduct.refetch();
        },
      }
    );
  };

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      handleClose();
      setOpenMess(true);
    } else if (data?.status === "Err") {
    }
  }, [isSuccessUpdated, dataUpdated]);

  const columns = [
    { field: "id", headerName: "QTT", width: 0 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "type", headerName: "Type", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
    { field: "discount", headerName: "Discount", width: 150 },
    { field: "countInStock", headerName: "InStock", width: 150 },
    {
      field: "image",
      headerName: "image",
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
            onClick={() => setIdProduct(params.row._id)}
            style={{ cursor: "pointer", marginRight: 10, color: "blue" }}
          />
          <DeleteOutlineOutlinedIcon
            onClick={() => setIdProductDelete(params.row._id)}
            style={{ cursor: "pointer", color: "red" }}
          />
        </>
      ),
    },
  ];

  let id = 0;

  const rows =
    products?.data?.length &&
    products?.data?.map((product) => {
      return {
        ...product,
        id: ++id,
        _id: product._id,
      };
    });

  //delted

  useEffect(() => {
    if (idProductDelete) {
      setOpenComfirm(true);
    }
  }, [idProductDelete]);

  const mutationDeleted = useMutationHook((data) => {
    const { id, token } = data;
    const res = ProductService.deleteProduct(id, token);
    return res;
  });

  const {
    isLoading: isLoadingDeleted,
    isSuccess: isSuccessDeteted,
    data: dataDeleted,
  } = mutationDeleted;

  const [openMessDeleted, setOpenMessDeleted] = useState(false);

  useEffect(() => {
    if (isSuccessDeteted && dataDeleted?.status === "Ok") {
      handleClose();
      setOpenMessDeleted(true);
    } else if (data?.status === "Err") {
    }
  }, [isSuccessDeteted, dataDeleted]);

  const handleDeleteProduct = () => {
    mutationDeleted.mutate(
      {
        id: idProductDelete,
        token: user?.access_token,
      },
      {
        onSettled: () => {
          fetchProduct.refetch();
        },
      }
    );
  };

  return (
    <div>
      {(openMess || openMessDeleted) && (
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
      <div>Product Manager</div>
      <div style={{ marginTop: "20px" }}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          sx={{ width: "170px", height: "40px" }}
          onClick={handleOpen}
        >
          Add Product
        </Button>

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
                  {!openDetail ? <> Add Product</> : <>Edit Product</>}

                  <span>
                    <CancelPresentationIcon
                      sx={{ marginRight: 4, cursor: "pointer" }}
                      onClick={handleClose}
                    />
                  </span>
                </div>

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
                      value={stateProduct["name"]}
                      onChange={handleOnchange}
                      name="name"
                      label="Name"
                    />
                    <TextField
                      sx={{
                        width: { xs: "90%", md: "90%", marginBottom: "20px" },
                      }}
                      value={stateProduct["price"]}
                      onChange={handleOnchange}
                      name="price"
                      type="text"
                      label="Price"
                    />
                    <TextField
                      sx={{
                        width: { xs: "90%", md: "90%", marginBottom: "20px" },
                      }}
                      value={stateProduct["type"]}
                      onChange={handleOnchange}
                      name="type"
                      type="text"
                      label="Type"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      sx={{
                        width: { xs: "90%", md: "90%", marginBottom: "20px" },
                      }}
                      value={stateProduct["countInStock"]}
                      onChange={handleOnchange}
                      name="countInStock"
                      type="text"
                      label="CountInStock"
                    />

                    <TextField
                      sx={{
                        width: { xs: "90%", md: "90%", marginBottom: "20px" },
                      }}
                      value={stateProduct["discount"]}
                      onChange={handleOnchange}
                      name="discount"
                      type="text"
                      label="Discount"
                    />
                    {/*   */}
                  </Grid>
                </Grid>
                <Grid container style={{ marginBottom: "20px" }}>
                  <Grid item xs={3}>
                    <Avatar
                      variant="square"
                      src={stateProduct?.image && stateProduct?.image}
                      sx={{ width: 120, height: 150 }}
                    >
                      Image
                    </Avatar>

                    <Button
                      component="label"
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                      style={{
                        width: 120,
                        height: 40,
                        marginTop: 10,
                        borderRadius: 0,
                      }}
                    >
                      Image 1
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
                        onChange={handleOnChangeImage}
                        type="file"
                        accept="image/*"
                      />
                    </Button>
                  </Grid>
                  {/* <Grid item xs={3}>
                    <Avatar
                      variant="square"
                      // src={stateProduct?.image && stateProduct?.image}
                      sx={{ width: 120, height: 150 }}
                    >
                      Image 2
                    </Avatar>
                    <Button
                      component="label"
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                      style={{
                        width: 120,
                        height: 40,
                        marginTop: 10,
                        borderRadius: 0,
                      }}
                    >
                      Image 2
                      <VisuallyHiddenInput type="file" />
                    </Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Avatar
                      variant="square"
                      // src={stateProduct?.image && stateProduct?.image}
                      sx={{ width: 120, height: 150 }}
                    >
                      Image 3
                    </Avatar>
                    <Button
                      component="label"
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                      style={{
                        width: 120,
                        height: 40,
                        marginTop: 10,
                        borderRadius: 0,
                      }}
                    >
                      Image 3
                      <VisuallyHiddenInput type="file" />
                    </Button>
                  </Grid>

                  <Grid item xs={3}>
                    <Avatar variant="square" sx={{ width: 120, height: 150 }}>
                      Image 4
                    </Avatar>
                    <Button
                      component="label"
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                      style={{
                        width: 120,
                        height: 40,
                        marginTop: 10,
                        borderRadius: 0,
                      }}
                    >
                      Image 4
                      <VisuallyHiddenInput type="file" />
                    </Button>
                  </Grid> */}
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
                    {!openDetail ? (
                      <>
                        <Button
                          disabled={
                            !stateProduct.name ||
                            !stateProduct.price ||
                            !stateProduct.type ||
                            !stateProduct.countInStock ||
                            !stateProduct.discount ||
                            !stateProduct.image
                          }
                          variant="outlined"
                          sx={{
                            height: "40px",
                            width: "100px",
                            marginRight: "30px",
                          }}
                          onClick={handleAddProduct}
                        >
                          {isLoading ? (
                            <CircularProgress
                              sx={{ marginLeft: "20px" }}
                              size="25px"
                            />
                          ) : (
                            <>Add</>
                          )}
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          disabled={
                            !stateProduct.name ||
                            !stateProduct.price ||
                            !stateProduct.type ||
                            !stateProduct.countInStock ||
                            !stateProduct.discount ||
                            !stateProduct.image
                          }
                          variant="outlined"
                          sx={{
                            height: "40px",
                            width: "100px",
                            marginRight: "30px",
                          }}
                          onClick={handleUpdateProduct}
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
                      </>
                    )}
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
            <Button color="error" onClick={handleDeleteProduct} autoFocus>
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
        <TableComponent
          rows={rows}
          columns={columns}
          isLoading={loadingProduct}
        />
      </div>
    </div>
  );
};

export default AdminProduct;
