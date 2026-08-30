import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import Home from "../pages/Home";
import ProductList from "../pages/ProductList";
import { RoleGuard } from "./roleGuard";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";

export const router = createBrowserRouter([
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
      // بعداً: product/:slug, cart

      // {
      //   element: <RoleGuard />,
      //   children: [
      //     { path: "profile", element: <Profile /> },
      //     { path: "orders", element: <Orders /> },
      //   ],
      // },
      // {
      //   element: <RoleGuard allowedRoles={["admin"]} />,
      //   children: [
      //     { path: "admin", element: <AdminLayout /> },
      //   ],
      // },
    ],
  },
]);