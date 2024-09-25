"use client";
import ProductList from "./products/page";
import "./globals.css";
import Contact from "@/app/contact/page";

const bannerWrapperStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  height: "90vh",
  overflow: "hidden",
};

const Home: React.FC = () => {
  return (
    <>
      <ProductList />
      <Contact />
    </>
  );
};

export default Home;
