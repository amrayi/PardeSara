import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import Home from "../pages/Home";
import { RoleGuard } from "./roleGuard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      // بعداً: products, product/:id, cart

      // نمونه استفاده از RoleGuard برای مسیرهای نیازمند لاگین (فعلاً کامنته):
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