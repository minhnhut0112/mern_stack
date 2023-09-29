import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import TypeProduct from "../pages/TypeProduct/TypeProduct";

export const routes = [
  {
    path: "/",
    page: HomePage,
    showHeaderAndFooter: true,
  },
  {
    path: "/product",
    page: ProductPage,
    showHeaderAndFooter: true,
  },
  {
    path: "/order",
    page: OrderPage,
    showHeaderAndFooter: true,
  },
  {
    path: "/category",
    page: TypeProduct,
    showHeaderAndFooter: true,
  },
  {
    path: "/sign-in",
    page: SignInPage,
    showHeaderAndFooter: false,
  },
  {
    path: "/sign-up",
    page: SignUpPage,
    showHeaderAndFooter: false,
  },
  {
    path: "/product-detail",
    page: ProductDetailPage,
    showHeaderAndFooter: true,
  },
  {
    path: "/order",
    page: OrderPage,
    showHeaderAndFooter: true,
  },

  {
    path: "*",
    page: NotFoundPage,
  },
];
