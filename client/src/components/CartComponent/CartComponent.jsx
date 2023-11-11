import React from "react";
import Grid from "@mui/material/Grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {
  decreaseAmount,
  increaseAmount,
  removeOrderProduct,
} from "../../redux/slices/orderSlice";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useEffect } from "react";
const CartComponent = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleChangeCount = (type, idProduct, limited) => {
    if (type === "increase") {
      if (!limited) {
        dispatch(increaseAmount({ idProduct }));
      }
    } else {
      if (!limited) {
        dispatch(decreaseAmount({ idProduct }));
      }
    }
  };

  const handleDeleteOrder = (idProduct) => {
    dispatch(removeOrderProduct({ idProduct }));
  };

  const products = order.orderItems;

  const totalPrice = useMemo(() => {
    let total = 0;

    products.forEach((product) => {
      total += (product.price - (product.discount || 15)) * product.amount;
    });

    return total;
  }, [products]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) {
      navigate("/sign-in");
    }
  }, []);

  const handleAddOrder = () => {
    if (order?.orderItems?.length) {
      navigate("/checkout");
    }
  };
  return (
    <div>
      <Grid
        sx={{
          padding: "0 5%",
          marginTop: 2,
          display: "flex",
          justifyContent: "center",
        }}
        container
        spacing={3}
      >
        <Grid item xs={12} sm={8} md={7}>
          <h2 style={{ marginBottom: 10 }}>Bag</h2>
          {order?.orderItems?.length == 0 && (
            <>
              <h4 style={{ margin: "10px 10px" }}>Bag is empty</h4> <hr />
            </>
          )}
          {order.orderItems.map((item) => (
            <>
              <Grid container spacing={3}>
                <Grid
                  item
                  md={3}
                  xs={4}
                  onClick={() => navigate(`/product-detail/${item?.product}`)}
                >
                  <img
                    src={item?.image}
                    alt="pd1"
                    style={{ width: "85%", height: "85%" }}
                  />
                </Grid>
                <Grid item md={8} xs={8}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h3>{item.name}</h3>
                    <h3>
                      <span
                        style={{
                          color: "#929292",
                          textDecoration: "line-through",
                          marginRight: 10,
                        }}
                      >
                        $ {item?.price * item?.amount}
                      </span>
                      <span style={{ color: "red" }}>
                        ${" "}
                        {(item?.price - (item?.discount || 15)) * item?.amount}
                      </span>
                    </h3>
                  </div>
                  <h5 style={{ margin: "10px 0px" }}>{item.type} </h5>
                  <div>
                    <div>Size: {item.size}</div>
                    <div
                      style={{
                        marginTop: 2,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <RemoveIcon
                        onClick={() =>
                          handleChangeCount(
                            "decrease",
                            item?.product,
                            item?.amount === 1
                          )
                        }
                      />
                      <input
                        style={{
                          textAlign: "center",
                          fontSize: 20,
                          width: "50px",
                        }}
                        min={1}
                        max={item.countInstock}
                        type="number"
                        value={item?.amount}
                        disabled
                      />
                      <AddIcon
                        onClick={() =>
                          handleChangeCount(
                            "increase",
                            item?.product,
                            item?.amount === item.countInstock
                          )
                        }
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <DeleteOutlineOutlinedIcon
                      onClick={() => handleDeleteOrder(item?.product)}
                    />
                  </div>
                </Grid>
              </Grid>
              <hr style={{ marginBottom: "20px" }} />
            </>
          ))}
        </Grid>
        <Grid item xs={12} sm={4} md={3} className="order__total">
          <h2 style={{ marginBottom: 10 }}>Summary</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <h3>Subtotal:</h3>
            <h3>{totalPrice} $</h3>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <h3>Estimated Delivery: </h3>
            <h3>0 $</h3>
          </div>
          <hr />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            <h3>Total:</h3>
            <h3>{totalPrice} $</h3>
          </div>
          <hr />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="addcart" onClick={() => handleAddOrder()}>
              Check Out
            </button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default CartComponent;
