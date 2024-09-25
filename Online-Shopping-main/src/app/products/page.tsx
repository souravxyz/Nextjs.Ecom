"use client";

import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Button,
  Pagination,
  Snackbar,
} from "@mui/material";
import { useGetProducts } from "@/hooks/react-query/useGetProducts";
import { Product } from "@/typescript/types/product.types";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import { useAppDispatch } from "@/hooks/redux/page";
import { addProduct } from "@/redux-toolkit/slice/cartSlice";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Products = () => {
  const { data, isLoading, isError } = useGetProducts();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (data) {
      setProducts(data);
      setFilteredProducts(data);
    }
  }, [data]);

  useEffect(() => {
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((item) => item.category === category);
      setFilteredProducts(filtered);
    }
    setPage(1);
  }, [category, products]);

  const handleProductClick = (productId: number) => {
    router.push(`/products/${productId}`);
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addProduct(product));
    toast.success("Product added to cart!");
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (isLoading) return <CircularProgress />;
  if (isError) return <div>Error fetching products</div>;

  return (
    <Container
      sx={{ my: 5, bgcolor: "#f5f5f5", borderRadius: 2, boxShadow: 3 }}
      maxWidth="lg"
    >
      <Typography
        variant="h2"
        align="center"
        gutterBottom
        sx={{ color: "#4A148C" }} // Title color
      >
        Explore Our Products
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4, justifyContent: "center" }}>
        <Button
          variant="outlined"
          sx={{ mx: 1, borderColor: "#FF6B6B", color: "#FF6B6B" }} // Outline color for buttons
          onClick={() => setCategory("All")}
        >
          All Products
        </Button>
        <Button
          variant="outlined"
          sx={{ mx: 1, borderColor: "#FF6B6B", color: "#FF6B6B" }}
          onClick={() => setCategory("men's clothing")}
        >
          Men's Fashion
        </Button>
        <Button
          variant="outlined"
          sx={{ mx: 1, borderColor: "#FF6B6B", color: "#FF6B6B" }}
          onClick={() => setCategory("women's clothing")}
        >
          Women's Fashion
        </Button>
        <Button
          variant="outlined"
          sx={{ mx: 1, borderColor: "#FF6B6B", color: "#FF6B6B" }}
          onClick={() => setCategory("jewelery")}
        >
          Jewelry
        </Button>
        <Button
          variant="outlined"
          sx={{ mx: 1, borderColor: "#FF6B6B", color: "#FF6B6B" }}
          onClick={() => setCategory("electronics")}
        >
          Electronics
        </Button>
      </Grid>
      <Grid container spacing={4}>
        {currentProducts.map((product: Product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                bgcolor: "#e3f2fd", // Card background color
                border: "1px solid #FF6B6B", // Border color for cards
                borderRadius: 2,
              }}
            >
              <CardMedia
                component="img"
                height="240"
                image={product.image}
                alt={product.title}
                sx={{ objectFit: "contain", width: "100%", p: 2 }}
                onClick={() => handleProductClick(product.id)}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  noWrap
                  sx={{ cursor: "pointer", color: "#d50000" }} // Title color
                  onClick={() => handleProductClick(product.id)}
                >
                  {product.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ height: "3em", overflow: "hidden", mb: 2 }}
                >
                  {product.description}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#388e3c" }} // Price color
                >
                  ${product.price.toFixed(2)}
                </Typography>
              </CardContent>
              <Box
                sx={{ p: 2, display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  variant="contained"
                  startIcon={<ShoppingBasketIcon />}
                  sx={{ bgcolor: "#FF6B6B", color: "#FFF" }} // Add to Cart button color
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<MonetizationOnIcon />}
                  sx={{ borderColor: "#FF6B6B", color: "#FF6B6B" }}
                >
                  {" "}
                  {/* Buy Now button color */}
                  Buy Now
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={Math.ceil(filteredProducts.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default Products;
