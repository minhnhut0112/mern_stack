import HomePage from "../pages/HomePage/HomePage";
import ProductPage from "../pages/ProductPage/ProductPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import TypeProduct from "../pages/TypeProduct/TypeProduct";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";

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
    showHeaderAndFooter: true,
  },
  {
    path: "/sign-up",
    page: SignUpPage,
    showHeaderAndFooter: true,
  },
  {
    path: "/product-detail",
    page: ProductDetailPage,
    showHeaderAndFooter: true,
  },

  {
    path: "*",
    page: NotFoundPage,
  },
];
