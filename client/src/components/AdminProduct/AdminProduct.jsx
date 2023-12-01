import React, { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
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
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
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
  const [loadingProduct, setloadingProduct] = useState(false);
  const [products, setProducts] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setOpenDetail(false);
    setOpenComfirm(false);
    setIdProductDelete("");
    setIdProduct("");
    setStateProduct(inittial);
  };

  const [openMess, setOpenMess] = useState(false);

  const handleCloseMess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenMess(false);
    setOpenMessDeleted(false);
  };

  const inittial = () => ({
    name: "",
    price: "",
    image: {
      img1: "",
      img2: "",
      img3: "",
      img4: "",
    },
    type: "",
    countInStock: "",
    newtype: "",
    discount: "",
  });

  const [stateProduct, setStateProduct] = useState(inittial());

  const mutation = useMutationHook((data) => {
    const res = ProductService.createProduct(data, user?.access_token);
    return res;
  });

  const { isLoading, isSuccess, data } = mutation;

  const handleOnchange = (e) => {
    if (e.target.name === "price") {
      e.target.value = Math.max(1, parseInt(e.target.value, 10) || 0);
    }
    if (e.target.name === "countInStock") {
      e.target.value = Math.max(1, parseInt(e.target.value, 10) || 0);
    }
    if (e.target.name === "discount") {
      e.target.value = Math.max(1, parseInt(e.target.value, 10) || 0);
    }

    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangeImage = async (e) => {
    const file = e.target.files[0];
    if (!file?.url && !file.preview) {
      file.preview = await getBase64(file);
    }
    if (file.preview) {
      setStateProduct({
        ...stateProduct,
        image: {
          ...stateProduct.image,
          [e.target.name]: file.preview,
        },
      });
    }
  };

  const getAllProduct = async () => {
    try {
      setloadingProduct(true);
      const res = await ProductService.getAllProduct();
      if (res.data) {
        setProducts(res.data);
        setloadingProduct(false);
      }
    } catch (error) {
      // Handle errors
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const handleAddProduct = async () => {
    try {
      console.log(stateProduct.image);
      const dateAdd = {
        name: stateProduct.name,
        price: stateProduct.price,
        image: stateProduct.image,
        type:
          stateProduct.type === "addtype"
            ? stateProduct.newtype
            : stateProduct.type,
        countInStock: stateProduct.countInStock,
        discount: stateProduct.discount,
      };
      await mutation.mutateAsync({
        ...dateAdd,
      });

      await getAllProduct();
      await fetchAllTypeProduct();
      setloadingProduct(false);
      // Refetch the product list

      handleClose();
    } catch (error) {
      // Handle errors
    }
  };

  useEffect(() => {
    if (isSuccess && data?.status === "True") {
      handleClose();
      setOpenMess(true);
    } else if (data?.status === "Err") {
      setOpenMess(true);
    }
  }, [isSuccess, data]);

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

  const handleUpdateProduct = async () => {
    const dateAdd = {
      name: stateProduct.name,
      price: stateProduct.price,
      image: stateProduct.image,
      type:
        stateProduct.type === "addtype"
          ? stateProduct.newtype
          : stateProduct.type,
      countInStock: stateProduct.countInStock,
      discount: stateProduct.discount,
    };
    try {
      await mutationUpdate.mutateAsync({
        id: idProduct,
        token: user?.access_token,
        ...dateAdd,
      });

      await getAllProduct();
      await fetchAllTypeProduct();
      setloadingProduct(false);
      // Refetch the product list

      handleClose();
    } catch (error) {
      // Handle errors
    }
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
    { field: "name", headerName: "Name", width: 250 },
    { field: "type", headerName: "Type", width: 100 },
    { field: "price", headerName: "Price", width: 100 },
    { field: "discount", headerName: "Discount", width: 100 },
    { field: "countInStock", headerName: "InStock", width: 100 },
    {
      field: "image",
      headerName: "image",
      width: 150,
      renderCell: (params) => (
        <Avatar
          variant="rounded"
          sx={{ width: 70, height: 70 }}
          alt={params}
          src={params.value}
        />
      ),
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
    products?.length &&
    products?.map((product) => {
      return {
        key: product,
        ...product,
        id: ++id,
        _id: product._id,
        image: product.image.img1,
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
    if (isSuccessDeteted && dataDeleted?.status === "OK") {
      handleClose();
      setOpenMessDeleted(true);
    } else if (data?.status === "Err") {
    }
  }, [isSuccessDeteted, dataDeleted]);

  const handleDeleteProduct = async () => {
    try {
      await mutationDeleted.mutateAsync({
        id: idProductDelete,
        token: user?.access_token,
      });

      await getAllProduct();
      await fetchAllTypeProduct();
      setloadingProduct(false);
      // Refetch the product list

      handleClose();
    } catch (error) {
      // Handle errors
    }
  };

  const [type, setType] = useState([]);

  const fetchAllTypeProduct = async () => {
    try {
      setloadingProduct(true);
      const res = await ProductService.getAllTypeProduct();
      if (res.data) {
        setType(res.data);
      }
    } catch (error) {
      // Handle errors
    }
  };

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

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
      {openMessDeleted && (
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
            The product was deleted successfully!
          </Alert>
        </Snackbar>
      )}
      <h2>Product Manager</h2>
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
                      type="number"
                      InputProps={{
                        inputProps: {
                          min: 1,
                        },
                      }}
                      label="Price"
                    />
                    <FormControl
                      sx={{
                        width: "90%",
                      }}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={stateProduct["type"]}
                        onChange={handleOnchange}
                        name="type"
                        label="Type"
                      >
                        {type.map((category) => (
                          <MenuItem key={category} value={category}>
                            {category}
                          </MenuItem>
                        ))}
                        <MenuItem value="addtype">New Type</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      sx={{
                        width: { xs: "90%", md: "90%", marginBottom: "20px" },
                      }}
                      value={stateProduct["countInStock"]}
                      onChange={handleOnchange}
                      name="countInStock"
                      type="number"
                      InputProps={{
                        inputProps: {
                          min: 1,
                        },
                      }}
                      label="CountInStock"
                    />

                    <TextField
                      sx={{
                        width: { xs: "90%", md: "90%", marginBottom: "20px" },
                      }}
                      value={stateProduct["discount"]}
                      onChange={handleOnchange}
                      name="discount"
                      type="number"
                      InputProps={{
                        inputProps: {
                          min: 1,
                        },
                      }}
                      label="Discount"
                    />
                    {stateProduct.type === "addtype" && (
                      <>
                        <TextField
                          sx={{
                            width: {
                              xs: "90%",
                              md: "90%",
                              marginBottom: "20px",
                            },
                          }}
                          onChange={handleOnchange}
                          name="newtype"
                          type="text"
                          label="New Type"
                        />
                      </>
                    )}
                  </Grid>
                </Grid>
                <Grid container style={{ marginBottom: "20px" }}>
                  <Grid item xs={3}>
                    <Avatar
                      variant="square"
                      src={stateProduct?.image.img1 && stateProduct?.image.img1}
                      sx={{ width: 120, height: 150, margin: "10px 0px" }}
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
                        name="img1"
                        onChange={handleOnChangeImage}
                        type="file"
                        accept="image/*"
                      />
                    </Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Avatar
                      variant="square"
                      src={stateProduct?.image.img2 && stateProduct?.image.img2}
                      sx={{ width: 120, height: 150, margin: "10px 0px" }}
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
                        name="img2"
                        onChange={handleOnChangeImage}
                        type="file"
                        accept="image/*"
                      />
                    </Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Avatar
                      variant="square"
                      src={stateProduct?.image.img3 && stateProduct?.image.img3}
                      sx={{ width: 120, height: 150, margin: "10px 0px" }}
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
                        name="img3"
                        onChange={handleOnChangeImage}
                        type="file"
                        accept="image/*"
                      />
                    </Button>
                  </Grid>

                  <Grid item xs={3}>
                    <Avatar
                      variant="square"
                      src={stateProduct?.image.img4 && stateProduct?.image.img4}
                      sx={{ width: 120, height: 150, margin: "10px 0px" }}
                    >
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
                        name="img4"
                        onChange={handleOnChangeImage}
                        type="file"
                        accept="image/*"
                      />
                    </Button>
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
                    {!openDetail ? (
                      <>
                        <Button
                          disabled={
                            !stateProduct.name ||
                            !stateProduct.price ||
                            !stateProduct.type ||
                            !stateProduct.countInStock ||
                            !stateProduct.discount ||
                            !stateProduct.image.img1 ||
                            !stateProduct.image.img2 ||
                            !stateProduct.image.img3 ||
                            !stateProduct.image.img4
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
