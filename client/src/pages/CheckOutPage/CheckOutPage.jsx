import {
  Alert,
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutationHook } from "../../hooks/useMutationHook";
import { updateUser } from "../../redux/slices/userSlice";
import * as UserService from "../../service/UserService";
import * as OrderService from "../../service/OrderService";
import { useNavigate } from "react-router-dom";
import { removeAllOrderProduct } from "../../redux/slices/orderSlice";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const CheckOutPage = () => {
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const [mess, setMess] = useState(false);
  const [messErr, setMessErr] = useState(false);
  const [payment, setPayment] = useState("default");
  const [sdkReady, setSdkReady] = useState(false);

  const handleCloseMess = () => {
    setMess(false);
    setMessErr(false);
  };
  const [userState, setuserState] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setuserState({
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        address: user?.address,
      });
    }
  }, [user]);

  useEffect(() => {
    if (order?.orderItems?.length <= 0) {
      navigate("/");
    }
  }, []);

  const handleOnChangeInput = (e) => {
    setuserState({
      ...userState,
      [e.target.name]: e.target.value,
    });
  };

  const mutationUpdate = useMutationHook((data) => {
    const { id, token, ...rests } = data;
    const res = UserService.updateUser(id, { ...rests }, token);
    return res;
  });

  const handleUpdateInforUser = () => {
    const { name, email, phone, address } = userState;
    if (name && email && phone && address) {
      mutationUpdate.mutate(
        { id: user?.id, token: user?.access_token, ...userState },
        {
          onSuccess: () => {
            dispatch(updateUser({ name, email, phone, address }));
            setMess(true);
          },
        }
      );
    }
  };

  const products = order.orderItems;

  const totalPrice = useMemo(() => {
    let total = 0;

    products.forEach((product) => {
      total += (product.price - (product.discount || 15)) * product.amount;
    });

    return total;
  }, [products]);

  const handlePayment = (e) => {
    setPayment(e.target.value);
  };

  const handleCheckOut = () => {
    if (!user?.phone || !user.address || !user.name || !user.email) {
      setMessErr(true);
    }
    if (
      user?.access_token &&
      order?.orderItems &&
      user?.name &&
      user?.address &&
      user?.phone &&
      totalPrice
    ) {
      mutationAddOrder.mutate({
        token: user?.access_token,
        orderItems: order?.orderItems,
        fullName: user?.name,
        address: user?.address,
        phone: user?.phone,
        paymentMethod: payment,
        totalPrice: totalPrice,
        user: user?.id,
        email: user?.email,
      });
    }
  };

  const mutationAddOrder = useMutationHook((data) => {
    const { token, ...rests } = data;
    const res = OrderService.createOrder({ ...rests }, token);
    return res;
  });

  const {
    data: dataAdd,
    isLoading: isLoadingAddOrder,
    isSuccess,
    isError,
  } = mutationAddOrder;

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && dataAdd?.status === "OK") {
      dispatch(removeAllOrderProduct());
      navigate("/checkoutSuccess");
    } else if (isError) {
    }
  }, [isSuccess, isError]);

  const onSuccessPaypal = (details, data) => {
    mutationAddOrder.mutate({
      token: user?.access_token,
      orderItems: order?.orderItems,
      fullName: user?.name,
      address: user?.address,
      phone: user?.phone,
      paymentMethod: payment,
      totalPrice: totalPrice,
      user: user?.id,
      email: user?.email,
      isPaid: true,
      paidAt: details.update_time,
    });
  };

  const addPaypalScript = async () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_CLIENT_ID}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!window.paypal) {
      addPaypalScript();
    } else {
      setSdkReady(true);
    }
  }, []);

  return (
    <div>
      <Grid sx={{ padding: "0 5%", marginTop: 2 }} container spacing={3}>
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
              Save is successfully !
            </Alert>
          </Snackbar>
        )}
        {messErr && (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={true}
            autoHideDuration={2000}
            onClose={handleCloseMess}
          >
            <Alert
              onClose={handleCloseMess}
              severity="error"
              sx={{ width: "100%" }}
            >
              Please complete all information !
            </Alert>
          </Snackbar>
        )}
        <Grid item xs={0} sm={0} md={2}></Grid>
        <Grid item xs={12} sm={7} md={5}>
          <h2 style={{ marginBottom: 20 }}>Enter your info and address:</h2>
          <TextField
            label="Full Name"
            name="name"
            value={userState.name}
            onChange={handleOnChangeInput}
            variant="outlined"
            style={{ width: "70%", marginBottom: "20px" }}
          />
          <TextField
            label="Phone"
            name="phone"
            value={userState.phone}
            onChange={handleOnChangeInput}
            variant="outlined"
            style={{ width: "70%", marginBottom: "20px" }}
          />
          <TextField
            label="Email"
            name="email"
            value={userState.email}
            onChange={handleOnChangeInput}
            variant="outlined"
            style={{ width: "70%", marginBottom: "20px" }}
          />
          <TextField
            label="Address"
            name="address"
            value={userState.address}
            onChange={handleOnChangeInput}
            variant="outlined"
            style={{ width: "70%", marginBottom: "20px" }}
          />
          <div>
            <span style={{ cursor: "not-allowed" }}>
              <Button
                variant="outlined"
                disabled={
                  !userState?.name ||
                  !userState?.email ||
                  !userState?.phone ||
                  !userState?.address
                }
                onClick={handleUpdateInforUser}
                sx={{ width: "100px", color: "black", borderColor: "black" }}
              >
                Save
              </Button>
            </span>
          </div>
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
            <h3>Free</h3>
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
          <h3 style={{ marginTop: 10 }}>Payment Method</h3>
          <RadioGroup onChange={handlePayment} value={payment}>
            <FormControlLabel
              control={<Radio />}
              value="default"
              label="Payment on delivery"
            />
            <FormControlLabel
              control={<Radio />}
              value="paypal"
              label="Paypal"
            />
          </RadioGroup>
          <hr />
          <div style={{ display: "flex", justifyContent: "center" }}>
            {payment === "paypal" && sdkReady ? (
              <div style={{ width: "100%", marginTop: 20 }}>
                <PayPalScriptProvider
                  options={{
                    "client-id": process.env.REACT_APP_CLIENT_ID,
                    locale: "en_US",
                  }}
                >
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: totalPrice, // Số tiền bạn muốn truyền vào
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={onSuccessPaypal}
                  />
                </PayPalScriptProvider>
              </div>
            ) : (
              <>
                <button
                  style={{ cursor: "pointer" }}
                  className="addcart"
                  onClick={handleCheckOut}
                >
                  Order now
                </button>
              </>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default CheckOutPage;
