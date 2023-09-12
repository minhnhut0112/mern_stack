import HomePage from "../pages/HomePage/HomePage";
import ProductPage from "../pages/ProductPage/ProductPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

export const routes = [
  {
    path: "/",
    page: HomePage,
    showHeader: true,
  },
  {
    path: "/product",
    page: ProductPage,
    showHeader: true,
  },
  {
    path: "/order",
    page: OrderPage,
    showHeader: true,
  },
  {
    path: "*",
    page: NotFoundPage,
  },
];
