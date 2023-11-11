import { Alert, Button, Grid, Skeleton, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import * as OrderService from "../../service/OrderService";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { useMutationHook } from "../../hooks/useMutationHook";

const MyOrderPage = () => {
  const [mess, setMess] = useState(false);
  const [messErr, setMessErr] = useState(false);
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
    { queryKey: ["orders"], queryFn: fetchMyOrder },
    {
      enabled: state?.id && state?.token,
    }
  );

  const { isLoading, data } = queryOrder;

  const mutation = useMutationHook((data) => {
    const { id, token, orderItems, userId } = data;
    const res = OrderService.cancelOrder(id, token, orderItems, userId);
    return res;
  });

  const handleCanceOrder = (order) => {
    console.log("order", order);
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
    } else if (isSuccessCancel && dataCancel?.status === "ERR") {
      setMessErr(true);
    }
  }, [isErrorCancle, isSuccessCancel]);

  const renderProduct = (data) => {
    return data?.map((order) => {
      return (
        <>
          <Grid container>
            <Grid item>
              <img src={order.image} alt="" width={90} />
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
                <p>x {order?.amount}</p>
              </div>
            </Grid>
          </Grid>
        </>
      );
    });
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
          <Grid item xs={5}>
            <hr />
            {data?.map((order) => {
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
                        <Button
                          onClick={() => handleCanceOrder(order)}
                          variant="outlined"
                        >
                          Cancel Orer
                        </Button>
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
