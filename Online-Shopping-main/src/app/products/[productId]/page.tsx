"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  Chip,
  Rating,
  Container,
  IconButton,
  TextField,
} from "@mui/material";
import { useGetProductDetails } from "@/hooks/react-query/useGetProductDetails";
import { useAppDispatch } from "@/hooks/redux/page";
import { addProduct } from "@/redux-toolkit/slice/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { Add, Remove } from "@mui/icons-material";

export default function Page({ params }: { params: { productId: string } }) {
  const { productId } = params;
  const { data, isLoading, isError } = useGetProductDetails(productId);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching product details...</div>;

  const handleAddToCart = () => {
    if (data) {
      const productToAdd = {
        id: data.id,
        title: data.title,
        price: data.price,
        image: data.image,
        qty: quantity,
      };
      dispatch(addProduct(productToAdd));
      toast.success("Successfully added to your cart!");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Discover Our Product
      </Typography>
      <Box sx={{ textAlign: "left", mb: 2 }}>
        <Link
          href="./"
          style={{ textDecoration: "none", color: "blue" }}
        >
          ← Back to Products
        </Link>
      </Box>
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                height: "400px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #ccc",
                borderRadius: "8px",
                backgroundColor: "#f5f5f5",
              }}
            >
              <Card sx={{ height: "100%", width: "100%" }}>
                <CardMedia
                  component="img"
                  sx={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                  image={data?.image}
                  alt={data?.title}
                />
              </Card>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: 2,
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#ffffff",
              }}
            >
              <Box>
                <Chip
                  label="Exclusive"
                  color="primary"
                  size="small"
                  sx={{ mb: 1 }}
                />
                <Chip
                  label="Limited Stock"
                  color="warning"
                  size="small"
                  sx={{ ml: 1, mb: 1 }}
                />
                <Typography variant="h5" gutterBottom>
                  {data?.title}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Rating value={5} readOnly />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    (2.5k ratings)
                  </Typography>
                </Box>
                <Typography variant="h6" color="text.primary" gutterBottom>
                  ${data?.price}
                </Typography>
                <Typography variant="body2" paragraph>
                  {data?.description}
                </Typography>
              </Box>
              <Box>
                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    variant="outlined"
                    sx={{ width: "48%" }}
                    onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                    disabled={quantity <= 1}
                  >
                    <Remove />
                  </Button>
                  <TextField
                    variant="outlined"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value)))
                    }
                    sx={{ width: "20%" }}
                    inputProps={{ min: 1 }}
                  />
                  <Button
                    variant="outlined"
                    sx={{ width: "48%" }}
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    <Add />
                  </Button>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    sx={{ mr: 2, width: "48%" }}
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ width: "48%" }}
                  >
                    Purchase Now
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <ToastContainer />
    </Container>
  );
}
