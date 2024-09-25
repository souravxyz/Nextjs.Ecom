"use client";
import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useAppDispatch, useAppSelector } from "@/hooks/redux/page";
import {
  removeFromCart,
  updateQuantity,
} from "@/redux-toolkit/slice/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const Cart = () => {
  const dispatch = useAppDispatch();
  const state: any = useAppSelector((state) => state.cart);
  const cartData = state.cartData;

  const totalQuantity = cartData.reduce(
    (total: number, item: any) => total + item.qty,
    0
  );
  const totalAmount = cartData.reduce(
    (total: number, item: any) => total + item.price * item.qty,
    0
  );

  const handleUpdateQuantity = (id: number, qty: number) => {
    if (qty < 1) qty = 1;
    dispatch(updateQuantity({ id, qty }));
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
    toast.error("Item successfully removed from cart!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 4, backgroundColor: "#eaeff1" }}>
      <ToastContainer />
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Shopping Cart Overview
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {cartData.length > 0 ? (
            cartData.map((item: any) => (
              <Card
                key={item.id}
                sx={{
                  display: "flex",
                  marginBottom: 3,
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: "12px",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: 180,
                    objectFit: "cover",
                    borderRadius: "12px 0 0 12px",
                  }}
                  image={item.image || "/path/to/placeholder-image.jpg"} // Fallback image
                  alt={item.title}
                />
                <CardContent
                  sx={{
                    flex: "1 0 auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    component="div"
                    variant="h6"
                    sx={{ fontWeight: "bold" }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    ${item.price}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                    <IconButton
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.qty - 1)
                      }
                      disabled={item.qty <= 1}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ mx: 1 }}>{item.qty}</Typography>
                    <IconButton
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.qty + 1)
                      }
                    >
                      <AddIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleRemoveItem(item.id)}
                      color="error"
                      sx={{ ml: 1 }}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="h6">Your cart is currently empty</Typography>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              padding: 3,
              borderRadius: "12px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Summary of Your Order
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography>Total Items:</Typography>
              <Typography>{totalQuantity}</Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography>Total Price:</Typography>
              <Typography>${totalAmount.toFixed(2)}</Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Go to Checkout
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cart;
