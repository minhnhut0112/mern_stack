import AdminPage from "../pages/AdminPage/AdminPage";
import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import CartPage from "../pages/CartPage/CartPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import TypeProduct from "../pages/TypeProduct/TypeProduct";
import OrderPage from "../pages/OrderPage/OrderPage";
import CheckOutPage from "../pages/CheckOutPage/CheckOutPage";
import CheckOutSuccessPage from "../pages/CheckOutSuccessPage/CheckOutSuccessPage";

export const routes = [
  {
    path: "/",
    page: HomePage,
    showHeaderAndFooter: true,
  },
  {
    path: "/product/:type",
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
    path: "/product-detail/:id",
    page: ProductDetailPage,
    showHeaderAndFooter: true,
  },
  {
    path: "/cart",
    page: CartPage,
    showHeaderAndFooter: true,
  },
  {
    path: "/checkout",
    page: CheckOutPage,
    showHeaderAndFooter: true,
  },
  {
    path: "/checkoutSuccess",
    page: CheckOutSuccessPage,
    showHeaderAndFooter: true,
  },
  {
    path: "/order",
    page: OrderPage,
    showHeaderAndFooter: true,
  },
  {
    path: "/profile",
    page: ProfilePage,
    showHeaderAndFooter: true,
  },
  {
    path: "/system/admin",
    page: AdminPage,
    showHeaderAndFooter: false,
    isPrive: true,
  },
  {
    path: "*",
    page: NotFoundPage,
  },
];
