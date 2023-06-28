import Home from "./pages/admin/home/Home";
import UserHome from "./pages/user/home/Home";
import Login from "./pages/admin/login/Login";
import List from "./pages/admin/list/List";
import Single from "./pages/admin/detailUser/Single";
import Properties from "./pages/admin/properties/Properties";
import CreateProduct from "./pages/admin/product/CreateProduct";
import Product from "./pages/admin/product/Product";

const publicRouters = [
  { path: "/", element: Home },
  { path: "/login", element: Login },
  { path: "/users", element: List },
  { path: "/users/:userId", element: Single },
  { path: "/properties", element: Properties },
  { path: "/create-product", element: CreateProduct },
  { path: "/home", element: UserHome },
  { path: "/products", element: Product },
];

const privateRouters = [];

export { publicRouters, privateRouters };
