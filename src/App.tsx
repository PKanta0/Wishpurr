import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout"
import AdminLayout from "./layouts/AdminLayout";

import Home from "./page/Home/Home";
import AllProducts from "./page/Products/AllProducts";
import Product from "./page/Products/Product";
import Review from "./page/Reviews/Review";
import CheckOut from "./page/CheckOut/CheckOut";
import Login from "./page/Auth/Login";
import Register from "./page/Auth/Register";
import Admin from "./page/Admin/Admin";
import ForgotPassword from "./page/Auth/ForgotPassword";

const App = () => {
  return (
    <Routes>
      {/* User */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/reviews" element={<Review />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      

      {/*  Admin */}
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<Admin />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;