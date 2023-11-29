import React from "react";
import "./style.scss";
import Grid from "@mui/material/Grid";
import SizeGuideComponent from "../SizeGuideComponent/SizeGuideComponent";
import * as ProductService from "../../service/ProductService";
import { useQuery } from "react-query";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrderProduct, resetOrder } from "../../redux/slices/orderSlice";
import { Alert, Skeleton, Snackbar } from "@mui/material";

const ProductdetailComponent = ({ idProduct }) => {
  const handleImageClick = (src) => {
    document.querySelector("#imgbig").src = src;
  };

  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [numProduct, setNumProduct] = useState(1);
  const [errorLimitOrder, setErrorLimitOrder] = useState(false);
  const [mess, setMess] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const OnchangeNumberProduct = (e) => {
    setNumProduct(Number(e.target.value));
  };

  const handleChangeCount = (type) => {
    if (type === "increase") {
      setNumProduct(numProduct + 1);
    } else {
      if (numProduct > 1) {
        setNumProduct(numProduct - 1);
      }
    }
  };

  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
    if (id) {
      const res = await ProductService.getDetailProduct(id);
      return res.data;
    }
  };

  const { isLoading, data: productDetails } = useQuery(
    ["product-details", idProduct.id],
    fetchGetDetailsProduct,
    { enabled: !!idProduct.id }
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (order?.isSucessOrder) {
      setMess(true);
    }
    return () => {
      dispatch(resetOrder());
    };
  }, [order?.isSucessOrder]);

  useEffect(() => {
    const orderRedux = order?.orderItems?.find(
      (item) => item.product === productDetails?._id
    );
    if (
      orderRedux?.amount + numProduct > orderRedux?.countInstock ||
      (!orderRedux && productDetails?.countInStock < numProduct)
    ) {
      setErrorLimitOrder(true);
    } else if (productDetails?.countInStock === 0) {
      setErrorLimitOrder(true);
    } else {
      setErrorLimitOrder(false);
    }
  }, [numProduct]);

  const handleAddCart = () => {
    if (!user.id) {
      navigate("/sign-in", { state: location?.pathname });
    } else {
      const orderRedux = order?.orderItems?.find(
        (item) => item.product === productDetails?._id
      );
      if (
        orderRedux?.amount + numProduct <= orderRedux?.countInstock ||
        (!orderRedux && productDetails?.countInStock >= numProduct)
      ) {
        dispatch(
          addOrderProduct({
            orderItem: {
              name: productDetails?.name,
              amount: numProduct,
              image: productDetails?.image.img1,
              type: productDetails?.type,
              price: productDetails?.price,
              product: productDetails?._id,
              discount: productDetails?.discount,
              countInstock: productDetails?.countInStock,
              size: selectedSize,
            },
          })
        );
        setErrorLimitOrder(false);
      } else {
        setErrorLimitOrder(true);
      }
    }
  };

  const handleCloseMess = () => {
    setMess(false);
  };

  return (
    <div>
      {mess && (
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
            Add cart is successfully !
          </Alert>
        </Snackbar>
      )}

      <Grid
        container
        spacing={3}
        sx={{
          padding: {
            xs: "0 20px",
            md: "20px 50px",
            display: "flex",
            justifyContent: "center",
          },
        }}
        className="row"
      >
        {isLoading ? (
          <Skeleton
            variant="rectangular"
            sx={{ width: "80%", height: "400px" }}
          />
        ) : (
          <>
            <Grid
              item
              xs={12}
              md={7}
              spacing={2}
              container
              className="row__col"
            >
              <Grid item xs={3} md={2} className="row__col__imgsmall">
                <img
                  onClick={() => handleImageClick(productDetails?.image.img1)}
                  src={productDetails?.image.img1}
                  style={{ cursor: "pointer" }}
                  alt="1"
                  id="imgsmall"
                />
                <img
                  onClick={() => handleImageClick(productDetails?.image.img2)}
                  src={productDetails?.image.img2}
                  style={{ cursor: "pointer" }}
                  alt="1"
                  id="imgsmall"
                />
                <img
                  onClick={() => handleImageClick(productDetails?.image.img3)}
                  src={productDetails?.image.img3}
                  style={{ cursor: "pointer" }}
                  alt="1"
                  id="imgsmall"
                />
                <img
                  onClick={() => handleImageClick(productDetails?.image.img4)}
                  src={productDetails?.image.img4}
                  style={{ cursor: "pointer" }}
                  alt="1"
                  id="imgsmall"
                />
              </Grid>
              <Grid item xs={9} md={10} className="row__col__imgbig">
                <img src={productDetails?.image.img1} alt="1" id="imgbig" />
              </Grid>
            </Grid>
            <Grid item xs={12} md={3} className="row__content">
              <p className="row__content__title">
                {productDetails?.name} <br />
                <span className="row__content__category">
                  {productDetails?.type}
                </span>
              </p>
              <p className="row__content__price">
                <span
                  style={{
                    marginRight: 10,
                    color: "#929292",
                    textDecoration: "line-through",
                  }}
                >
                  $ {productDetails?.price}
                </span>
                $ {productDetails?.price - (productDetails?.discount || 15)}
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <RemoveIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => handleChangeCount("decrease")}
                />
                <input
                  onChange={OnchangeNumberProduct}
                  style={{ textAlign: "center", fontSize: 20, width: "50px" }}
                  type="number"
                  value={numProduct}
                  disabled
                />
                <AddIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => handleChangeCount("increase")}
                />
              </div>

              <div className="row__content__selectsize">
                <h3>Select Size</h3>
                <div>
                  <SizeGuideComponent />
                </div>
              </div>

              <div className="row__content__size">
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <input
                      type="radio"
                      id="35"
                      name="size"
                      value={35}
                      checked={selectedSize === 35}
                      onChange={() => setSelectedSize(35)}
                    />
                    <label htmlFor="35">35</label>
                  </Grid>
                  <Grid item xs={3}>
                    <input
                      type="radio"
                      id="36"
                      name="size"
                      value={36}
                      checked={selectedSize === 36}
                      onChange={() => setSelectedSize(36)}
                    />
                    <label htmlFor="36">36</label>
                  </Grid>
                  <Grid item xs={3}>
                    <input
                      type="radio"
                      id="37"
                      name="size"
                      value={37}
                      checked={selectedSize === 37}
                      onChange={() => setSelectedSize(37)}
                    />
                    <label htmlFor="37">37</label>
                  </Grid>
                  <Grid item xs={3}>
                    <input
                      type="radio"
                      id="38"
                      name="size"
                      value={38}
                      checked={selectedSize === 38}
                      onChange={() => setSelectedSize(38)}
                    />
                    <label htmlFor="38">38</label>
                  </Grid>
                  <Grid item xs={3}>
                    <input
                      type="radio"
                      id="39"
                      name="size"
                      value={39}
                      checked={selectedSize === 39}
                      onChange={() => setSelectedSize(39)}
                    />
                    <label htmlFor="39">39</label>
                  </Grid>
                  <Grid item xs={3}>
                    <input
                      type="radio"
                      id="40"
                      name="size"
                      value={40}
                      checked={selectedSize === 40}
                      onChange={() => setSelectedSize(40)}
                    />
                    <label htmlFor="40">40</label>
                  </Grid>
                  <Grid item xs={3}>
                    <input
                      type="radio"
                      id="41"
                      name="size"
                      value={41}
                      checked={selectedSize === 41}
                      onChange={() => setSelectedSize(41)}
                    />
                    <label htmlFor="41">41</label>
                  </Grid>
                  <Grid item xs={3}>
                    <input
                      type="radio"
                      id="42"
                      name="size"
                      value={42}
                      checked={selectedSize === 42}
                      onChange={() => setSelectedSize(42)}
                    />
                    <label htmlFor="42">42</label>
                  </Grid>
                  <Grid item xs={3}>
                    <input
                      type="radio"
                      id="43"
                      name="size"
                      value={43}
                      checked={selectedSize === 43}
                      onChange={() => setSelectedSize(43)}
                    />
                    <label htmlFor="43">43</label>
                  </Grid>
                  <Grid item xs={3}>
                    <input
                      type="radio"
                      id="44"
                      name="size"
                      value={44}
                      checked={selectedSize === 44}
                      onChange={() => setSelectedSize(44)}
                    />
                    <label htmlFor="44">44</label>
                  </Grid>
                </Grid>
              </div>
              {errorLimitOrder && (
                <div style={{ color: "red" }}>
                  Product is not in sufficient quantity
                </div>
              )}
              <button
                disabled={!selectedSize || errorLimitOrder}
                className="row__content__addcart"
                onClick={handleAddCart}
              >
                add to card
              </button>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
};

export default ProductdetailComponent;
