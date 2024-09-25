export const productURL = "https://fakestoreapi.com";
export const userURL = "https://login-yh9z.onrender.com";

export const endpoints = {
  products: "/products",
  product: (id: string) => `/products/${id}`,
  categories: "/products/categories",
  productByCategory: "/products/category/:category",
  login: "/login",
  signup: "/signup",
  profile: "/profile",
  editProfile: "/editprofile",
};
