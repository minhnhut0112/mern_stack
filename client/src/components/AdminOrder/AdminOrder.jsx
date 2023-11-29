import React from "react";
import { useSelector } from "react-redux";
import * as OrderService from "../../service/OrderService";
import { useQuery } from "react-query";
import TableComponent from "../TableComponent/TableComponent";
import { Alert, Avatar, Button, Grid, Snackbar } from "@mui/material";
import { useState } from "react";

const AdminOrder = () => {
  const user = useSelector((state) => state?.user);

  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder(user?.access_token);
    return res;
  };

  const queryOrder = useQuery({ queryKey: ["orders"], queryFn: getAllOrder });
  const {
    isLoading: isLoadingOrders,
    data: orders,
    refetch: refetchOrders,
  } = queryOrder;

  const handleConfirmOrder = async (orderId) => {
    const res = await OrderService.updateOrder(orderId);
    if (res.status === "OK") {
      refetchOrders();
      setOpenMess(true);
    }
  };

  const columns = [
    { field: "id", headerName: "QTT", width: 50 },
    {
      field: "orderItems",
      headerName: "Item Orders",
      width: 200,
      renderCell: (params) => (
        <div>
          <Grid container>
            {params.value.map((item, index) => (
              <Grid item xs={6}>
                <div key={index}>
                  <Avatar
                    variant="rounded"
                    src={item.image}
                    alt={item.name}
                    sx={{ width: 70, height: 70, marginRight: "10px" }}
                  />
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      ),
    },
    {
      field: "shippingAddress",
      headerName: "Order Info",
      width: 350,
      renderCell: (params) => (
        <div style={{ fontSize: 12 }}>
          <p>
            <strong>Full Name:</strong> {params.value.fullName}
          </p>
          <p>
            <strong>Address:</strong> {params.value.address}
          </p>
          <p>
            <strong>Phone:</strong> 0{params.value.phone}
          </p>
        </div>
      ),
    },
    { field: "isDelivered", headerName: "Delivered" },
    { field: "isPaid", headerName: "IsPaid" },
    { field: "paymentMethod", headerName: "Payment" },
    { field: "totalPrice", headerName: "Total Price" },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <>
          <Button
            disabled={params.row.isDelivered}
            variant="outlined"
            onClick={() => handleConfirmOrder(params.row._id)}
          >
            Confirm
          </Button>
        </>
      ),
    },
  ];

  let id = 0;

  const rows = orders?.data?.map((order) => {
    return {
      ...order,
      id: ++id,
      _id: order._id,
    };
  });

  const [openMess, setOpenMess] = useState(false);

  const handleCloseMess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenMess(false);
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
            Confirm is successfully!
          </Alert>
        </Snackbar>
      )}
      <h2>Order Manager</h2>
      <div style={{ marginTop: "20px" }}>
        <TableComponent
          rows={rows}
          columns={columns}
          isLoading={isLoadingOrders}
        />
      </div>
    </div>
  );
};

export default AdminOrder;
