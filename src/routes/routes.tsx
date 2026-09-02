import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import AdminLayout from "../layouts/AdminLayout";
import Home from "../pages/Home";
import ProductList from "../pages/ProductList";
import ProductDetail from "../pages/ProductDetail";
import Login from "../pages/Login";
import VerifyOtp from "../pages/VerifyOtp";
import { RoleGuard } from "./roleGuard";
import Cart from "../pages/Cart";
import Dashboard from "../pages/admin/Dashboard";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminOrders from "../pages/admin/AdminOrders";
import StoreSettings from "../pages/admin/StoreSettings";
import ProductForm from "../pages/admin/ProductForm";
import Profile from "../pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/login/verify",
    element: <VerifyOtp />,
  },
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { 
        index: true, 
        element: <Home /> 
      },
      { 
        path: "products", 
        element: <ProductList /> 
      },
      { 
        path: "products/:slug", 
        element: <ProductDetail /> 
      },
      { 
        path: "cart", 
        element: <Cart /> 
      },
      { 
        path: "user/profile", 
        element: <Profile /> 
      },
      // بعداً: cart, profile, orders (customer)
      // {
      //   element: <RoleGuard />,
      //   children: [
      //     { path: "profile", element: <Profile /> },
      //     { path: "orders", element: <Orders /> },
      //   ],
      // },
    ],
  },
  {
    element: <RoleGuard allowedRoles={["customer"]} />, // in ro admin kon
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { 
            index: true, 
            element: <Dashboard /> 
          },
          { 
            path: "products", 
            element: <AdminProducts /> 
          },
          { 
            path: "orders", 
            element: <AdminOrders /> 
          },
          { 
            path: "store-detail", 
            element: <StoreSettings /> 
          },
          { 
            path: "add-product", 
            element: <ProductForm /> 
          },
        ],
      },
    ],
  },
]);