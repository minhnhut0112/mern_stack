// import { Box, Grid, Modal, TextField } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import CancelPresentationOutlinedIcon from "@mui/icons-material/CancelPresentationOutlined";
// import React, { useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// // import { useQuery } from "react-query";
// import * as ProductService from "../../service/ProductService";
// import { useEffect } from "react";
// import { useDebounce } from "../../hooks/useDebounceHook";

// const ModalSearchComponent = (props) => {
//   const searchProduct = useSelector((state) => state?.product?.search);
//   const searchDebounce = useDebounce(searchProduct, 500);
//   const [stateSearch, setStateSearch] = useState("");
//   const refetch = useRef();

//   const handleOnChangeSearch = (e) => {
//     setStateSearch(e.target.value);
//   };

//   const fetchProductSearch = async (search) => {
//     const res = await ProductService.getAllProduct(search);
//     return res;
//   };

//   console.log(stateSearch);

//   useEffect(() => {
//     if (refetch.current) {
//       fetchProductSearch(stateSearch);
//     }
//     refetch.current = false;
//   }, [stateSearch]);

//   const { isLoading, data: products } = useQuery(
//     ["products"],
//     fetchProductSearch,
//     {
//       retry: 3,
//       retryDelay: 1000,
//     }
//   );

//   return (
//     <div>
//       <Modal
//         open={props?.open}
//         onClose={props?.handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box
//           sx={{
//             overflowY: "scroll",
//             "&::-webkit-scrollbar-thumb": {
//               display: "none",
//             },
//             "&::-webkit-scrollbar-track": {
//               display: "none",
//             },
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: { xs: 200, md: 600 },
//             height: { xs: 180, md: 500 },
//             bgcolor: "background.paper",
//             borderRadius: 2,
//             boxShadow: 24,
//             p: 4,
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "end",
//               gap: 20,
//             }}
//           >
//             <SearchIcon />
//             <TextField
//               autofocus
//               placeholder="Search ...."
//               type="search"
//               color="grey"
//               fullWidth
//               variant="standard"
//               onChange={handleOnChangeSearch}
//             />
//             <CancelPresentationOutlinedIcon onClick={props?.handleClose} />
//           </div>

//           {/* {fetch && ( */}
//           <>
//             {products?.data?.map((product) => {
//               return (
//                 <>
//                   <Grid container sx={{ marginTop: 2, padding: 1.5 }}>
//                     <Grid item md={2}>
//                       <img
//                         src={product.image}
//                         alt=""
//                         style={{ width: "100%", height: "100%" }}
//                       />
//                     </Grid>
//                     <Grid item md={6} sx={{ marginLeft: 5 }}>
//                       <h2>{product.name}</h2>
//                       <h3>{product.type}</h3>
//                       <p>{product.price}</p>
//                     </Grid>
//                   </Grid>
//                   <hr />
//                 </>
//               );
//             })}
//           </>
//           {/* )} */}

//           {/* <Grid container spacing={3}>
//             <Grid item xs={12} md={4} sm={6}>
//               <CardComponent
//                 key={product._id}
//                 countInStock={product.countInStock}
//                 image={product.image}
//                 name={product.name}
//                 price={product.price}
//                 type={product.type}
//                 discount={product.discount}
//               />
//             </Grid>
//           </Grid> */}
//         </Box>
//       </Modal>
//     </div>
//   );
// };

// export default ModalSearchComponent;
