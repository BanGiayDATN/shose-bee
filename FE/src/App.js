import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppConfig } from "./AppConfig";
import { ToastContainer } from "react-toastify";
import NotFound from "./pages/403";
import NotAuthorized from "./pages/404";
import AuthGuard from "./guard/AuthGuard";
import GuestGuard from "./guard/GuestGuard";
import DashBoardCustomer from "./component/customer/DashBoardCustomer";
import Home from "./pages/Home";
import DashBoardEmployee from "./component/employee/DashBoardEmployee";
import ProductManagement from "./pages/employee/product-management/ProductManagement";
import Dashboard from "./pages/employee/dashboard/DashBoard";
import CategoryManagement from "./pages/employee/category-management/CategoryManagement";
import BrandManagement from "./pages/employee/brand-management/BrandManagement";
import MaterialManagement from "./pages/employee/material-management/MaterialManagement";
import SoleManagement from "./pages/employee/sole-management/SoleManagement";
import AccountManagement from "./pages/employee/account-management/AccountManagement";
import CreateProductManagment from "./pages/employee/product-management/CreateProductManagment";
import VoucherManagement from "./pages/employee/voucher-management/VoucherManagement";
import BillManagement from "./pages/employee/bill-management/BillManagement";
import DetailBill from "./pages/employee/bill-management/DetailBill";
import CreateBill from "./pages/employee/bill-management/CreateBill";
import AddressManagement from "./pages/customer/address-management/AddressManagement";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <BrowserRouter basename={AppConfig.routerBase}>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/layout-guard-roles" element={<NotAuthorized />} />
          <Route path="/" element={<Navigate replace to="/dashboard" />} />
          <Route
            path="/home"
            element={
              <GuestGuard>
                <DashBoardCustomer>
                  <Home />
                </DashBoardCustomer>
              </GuestGuard>
            }
          />
           <Route
            path="/bill-management"
            element={
              <AuthGuard>
                <DashBoardEmployee>
                  <BillManagement />
                </DashBoardEmployee>
              </AuthGuard>
            }
          />
           <Route
            path="/bill-management/detail-bill/:id"
            element={
              <AuthGuard>
                <DashBoardEmployee>
                  <DetailBill />
                </DashBoardEmployee>
              </AuthGuard>
            }
          />
          <Route
            path="/sale-counter"
            element={
              <AuthGuard>
                <DashBoardEmployee>
                  <CreateBill />
                </DashBoardEmployee>
              </AuthGuard>
            }
          />
          <Route
            path="/product-management"
            element={
              <AuthGuard>
                <DashBoardEmployee>
                  <ProductManagement />
                </DashBoardEmployee>
              </AuthGuard>
            }
          />
          <Route
            path="/create-product-management"
            element={
              <AuthGuard>
                <DashBoardEmployee>
                  <CreateProductManagment />
                </DashBoardEmployee>
              </AuthGuard>
            }
          />
          <Route
            path="/dashboard"
            element={
              <AuthGuard>
                <DashBoardEmployee>
                  <Dashboard />
                </DashBoardEmployee>
              </AuthGuard>
            }
          />
          <Route
            path="/category-management"
            element={
              <AuthGuard>
                <DashBoardEmployee>
                  <CategoryManagement />
                </DashBoardEmployee>
              </AuthGuard>
            }
          />
          <Route
            path="/material-management"
            element={
              <AuthGuard>
                <DashBoardEmployee>
                  <MaterialManagement />
                </DashBoardEmployee>
              </AuthGuard>
            }
          />
          <Route
            path="/brand-management"
            element={
              <AuthGuard>
                <DashBoardEmployee>
                  <BrandManagement />
                </DashBoardEmployee>
              </AuthGuard>
            }
          />
          <Route
            path="/sole-management"
            element={
              <AuthGuard>
                <DashBoardEmployee>
                  <SoleManagement />
                </DashBoardEmployee>
              </AuthGuard>
            }
          />
          <Route
            path="/address"
            element={
              <AuthGuard>
                <DashBoardEmployee>
                  <AddressManagement />
                </DashBoardEmployee>
              </AuthGuard>
            }
          />{" "}
          <Route
            path="/account-management"
            element={
              <AuthGuard>
                <DashBoardEmployee>
                  <AccountManagement />
                </DashBoardEmployee>
              </AuthGuard>
            }
          />
          <Route
            path="/voucher-management"
            element={
              <AuthGuard>
                <DashBoardEmployee>
                  <VoucherManagement />
                </DashBoardEmployee>
              </AuthGuard>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
