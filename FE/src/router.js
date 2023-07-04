import Home from "./pages/admin/home/Home";
import UserHome from "./pages/user/home/Home";
import Login from "./pages/admin/login/Login";
import List from "./pages/admin/list/List";
import Single from "./pages/admin/detailUser/Single";
import Properties from "./pages/admin/properties/Properties";
import CreateProduct from "./pages/admin/product/CreateProduct";
import Product from "./pages/admin/product/Product";
import Employee from "./pages/admin/employee/Employee";
import MemberOffers from "./pages/admin/voucher/MemberOffers";
import Voucher from "./pages/admin/voucher/Voucher";
import Bill from "./pages/admin/bill/Bill";
import ViewCategory from "./pages/admin/category/ViewCategory";
import ViewSole from "./pages/admin/sole/ViewSole";

const publicRouters = [
  { path: "/", element: Home },
  { path: "/login", element: Login },
  { path: "/users", element: List },
  { path: "/users/:userId", element: Single },
  { path: "/properties", element: Properties },
  { path: "/create-product", element: CreateProduct },
  { path: "/employee", element: Employee },
  { path: "/user", element: Single },
  { path: "/member-offers", element: MemberOffers },
  { path: "/voucher", element: Voucher },
  { path: "/products", element: Product },
  { path: "/home", element: UserHome },
  { path: "/bill", element: Bill },
  { path: "/category", element: ViewCategory },
  { path: "/sole", element: ViewSole },
  

];

const privateRouters = [];

export { publicRouters, privateRouters };
