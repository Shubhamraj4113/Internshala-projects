import { createBrowserRouter } from "react-router-dom";

import { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const ProductDetail = lazy(() =>
  import("../pages/ProductDetail")
);
const Cart = lazy(() => import("../pages/Cart"));
const Checkout = lazy(() =>
  import("../pages/Checkout")
);
const NotFound = lazy(() =>
  import("../pages/NotFound")
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/product/:id",
    element: <ProductDetail />,
  },

  {
    path: "/cart",
    element: <Cart />,
  },

  {
    path: "/checkout",
    element: <Checkout />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);