import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Skeleton,
  Snackbar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import * as OrderService from "../../service/OrderService";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { useMutationHook } from "../../hooks/useMutationHook";

const MyOrderPage = () => {
  const [mess, setMess] = useState(false);
  const [messErr, setMessErr] = useState(false);
  const [openComfirm, setopenComfirm] = useState(false);

  const location = useLocation();
  const { state } = location;
  const user = useSelector((state) => state.user);

  const handleCloseMess = () => {
    setMess(false);
    setMessErr(false);
  };

  const fetchMyOrder = async () => {
    const res = await OrderService.getOrderByUserId(state?.id, state?.token);
    return res.data;
  };

  const queryOrder = useQuery(
    { queryKey: ["myorders"], queryFn: fetchMyOrder },
    {
      enabled: state?.id && state?.token,
    }
  );

  const { isLoading, data, isSuccess } = queryOrder;

  const mutation = useMutationHook((data) => {
    const { id, token, orderItems, userId } = data;
    const res = OrderService.cancelOrder(id, token, orderItems, userId);
    return res;
  });

  const handleCanceOrder = (order) => {
    mutation.mutate(
      {
        id: order?._id,
        token: state?.token,
        orderItems: order?.orderItems,
        userId: user?.id,
      },
      {
        onSuccess: () => {
          queryOrder.refetch();
        },
      }
    );
  };
  const {
    isLoading: isLoadingCancel,
    isSuccess: isSuccessCancel,
    isError: isErrorCancle,
    data: dataCancel,
  } = mutation;

  useEffect(() => {
    if (isSuccessCancel && dataCancel?.status === "OK") {
      setMess(true);
      handleClose();
    } else if (isSuccessCancel && dataCancel?.status === "ERR") {
      setMessErr(true);
      handleClose();
    }
  }, [isErrorCancle, isSuccessCancel]);

  const navigate = useNavigate();

  const renderProduct = (dataorder) => {
    return dataorder?.map((order) => {
      return (
        <>
          <Grid container>
            <Grid item>
              <img
                src={order.image}
                alt=""
                width={90}
                onClick={() => navigate(`/product-detail/${order?.product}`)}
                style={{ cursor: "pointer" }}
              />
            </Grid>
            <Grid item>
              <div style={{ marginLeft: 30 }}>
                <h5>{order?.name}</h5>
                <div>
                  <span
                    style={{
                      marginRight: 10,
                      color: "#929292",
                      textDecoration: "line-through",
                    }}
                  >
                    $ {order?.price}
                  </span>
                  <span style={{ color: "red" }}>
                    $ {order?.price - (order?.discount || 15)}
                  </span>
                </div>
                <p>Size: {order.size}</p>
                <p>x {order?.amount}</p>
              </div>
            </Grid>
          </Grid>
        </>
      );
    });
  };

  const handleClose = () => {
    setopenComfirm(false);
  };

  return (
    <>
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
            Cancel order is successfully !
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
      <h3
        style={{
          marginLeft: "29%",
          marginTop: "40px",
        }}
      >
        My Order
      </h3>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 2,
        }}
      >
        {isLoading || isLoadingCancel ? (
          <Skeleton
            variant="rectangular"
            sx={{ width: "41%", height: "200px" }}
          />
        ) : (
          <Grid item xs={10} md={5}>
            <hr />
            {isSuccess &&
              data?.map((order) => {
                return (
                  <>
                    <div style={{ padding: "20px" }}>
                      <div
                        style={{
                          textAlign: "end",
                          color: "#26aa99",
                          marginBottom: "10px",
                        }}
                      >
                        {order?.isDelivered
                          ? "  Are delivering"
                          : "  Wait for confirmation"}
                      </div>
                      <div>{renderProduct(order?.orderItems)}</div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: 10,
                        }}
                      >
                        <div>
                          Total Price:{" "}
                          <span style={{ color: "red" }}>
                            $ {order?.totalPrice}
                          </span>
                        </div>
                        {!order?.isDelivered && (
                          <>
                            <Button
                              onClick={() => setopenComfirm(true)}
                              variant="outlined"
                            >
                              Cancel Orer
                            </Button>
                            <Dialog open={openComfirm} onClose={handleClose}>
                              <DialogTitle>Confirm Deletion</DialogTitle>
                              <DialogContent>
                                Are you sure you want to remove this product
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={handleClose}>Disagree</Button>
                                <Button
                                  color="error"
                                  onClick={() => handleCanceOrder(order)}
                                  autoFocus
                                >
                                  <>AGREE</>
                                </Button>
                              </DialogActions>
                            </Dialog>
                          </>
                        )}
                      </div>
                    </div>
                    <hr />
                  </>
                );
              })}
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default MyOrderPage;
