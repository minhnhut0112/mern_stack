import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { CircularProgress, Grid, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import * as ProductService from "../../service/ProductService";
import { useDebounce } from "../../hooks/useDebounceHook";
import { useNavigate } from "react-router-dom";

export default function BasicModal({ open, onClose }) {
  const [search, setSearch] = React.useState("");
  const [products, setProducts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const textFieldRef = React.useRef(null);

  React.useEffect(() => {
    if (open) {
      setTimeout(() => {
        textFieldRef.current.focus();
      }, 0);
      setSearch("");
    }
  }, [open]);

  const handleClose = () => {
    if (onClose) {
      onClose(true);
    }
    setProducts([]);
  };

  const handleOnChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const searchProduct = async (search) => {
    if (search) {
      setIsLoading(true);
      const res = await ProductService.getAllProduct(search);
      if (res.status === "OK") {
        setProducts(res.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } else {
      setProducts([]);
    }
  };

  function capitalizeFirstLetter(str) {
    return str.replace(/\b\w/g, function (match) {
      return match.toUpperCase();
    });
  }

  const searchDebounce = useDebounce(capitalizeFirstLetter(search), 500);

  React.useEffect(() => {
    searchProduct(searchDebounce);
  }, [searchDebounce]);

  const navigate = useNavigate();
  const handleDetailsProduct = (id) => {
    navigate(`/product-detail/${id}`);
    handleClose();
  };

  const style = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    maxWidth: 400,
    minHeight: 400,
    maxHeight: 400,
    borderRadius: "10px",
    bgcolor: "background.paper",
    p: 4,
    overflowY: "auto",
    msOverflowStyle: "none",
    scrollbarWidth: "thin",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <SearchIcon style={{ fontSize: 30 }} />
            <TextField
              onChange={handleOnChangeSearch}
              type="search"
              inputRef={textFieldRef}
              sx={{ width: "100%" }}
              variant="standard"
              placeholder="Search..."
            />
          </div>
          {isLoading ? (
            <div style={{ textAlign: "center" }}>
              <CircularProgress sx={{ marginTop: "20px" }} size="35px" />
            </div>
          ) : (
            <div style={{ marginTop: "10px" }}>
              {products &&
                products?.map((product) => {
                  return (
                    <>
                      <Grid
                        container
                        spacing={2}
                        onClick={() => handleDetailsProduct(product._id)}
                        style={{ cursor: "pointer " }}
                      >
                        <Grid item xs={3}>
                          <img
                            src={product.image.img1}
                            alt=""
                            style={{ width: "100%" }}
                          />
                        </Grid>
                        <Grid item xs={9}>
                          <p style={{ marginBottom: 5 }}>{product.name}</p>
                          <p style={{ marginBottom: 5 }}> {product.type}</p>
                          <p>
                            <span
                              style={{
                                marginRight: 10,

                                color: "#929292",
                                textDecoration: "line-through",
                              }}
                            >
                              $ {product?.price}
                            </span>
                            <span style={{ color: "red" }}>
                              $ {product?.price - (product?.discount || 15)}
                            </span>
                          </p>
                        </Grid>
                      </Grid>
                    </>
                  );
                })}
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
