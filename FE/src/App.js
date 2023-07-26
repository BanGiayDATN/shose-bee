import "./App.css";
import { AppConfig } from "./AppConfig";
import { ToastContainer } from "react-toastify";
import NotFound from "./pages/403";
import NotAuthorized from "./pages/404";
import AuthGuard from "./guard/AuthGuard";
import GuestGuard from "./guard/GuestGuard";
import DashBoardCustomer from "./component/customer/DashBoardCustomer";
import Home from "./pages/customer/home/Home";
import DashBoardEmployee from "./component/employee/DashBoardEmployee";
import ProductManagement from "./pages/employee/product-management/ProductManagement";
import CreatePromotionManagement from "./pages/employee/promotion-management/CreatePromotionManagement"
import Dashboard from "./pages/employee/dashboard/DashBoard";
import CategoryManagement from "./pages/employee/category-management/CategoryManagement";
import BrandManagement from "./pages/employee/brand-management/BrandManagement";
import MaterialManagement from "./pages/employee/material-management/MaterialManagement";
import SoleManagement from "./pages/employee/sole-management/SoleManagement";
import AccountManagement from "./pages/employee/account-management/AccountManagement";
import CreateProductManagment from "./pages/employee/product-management/CreateProductManagment";
import PromotionManagement from "./pages/employee/promotion-management/PromotionManagement";
import BillManagement from "./pages/employee/bill-management/BillManagement";
import DetailBill from "./pages/employee/bill-management/DetailBill";
import CreateBill from "./pages/employee/bill-management/CreateBill";
import AddressManagement from "./pages/customer/address-management/AddressManagement";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CustomerManagement from "./pages/employee/customer-management/CustomerManagement";
import ModalCreateAccount from "./pages/employee/account-management/modal/ModalCreateAccount";
import ModalUpdateAccount from "./pages/employee/account-management/modal/ModalUpdateAccount";
import ModalDetailAccount from "./pages/employee/account-management/modal/ModalDetailAccount";
import ModalCreateCustomer from "./pages/employee/customer-management/modal/ModalCreateCustomer";
import ModalUpdateCustomer from "./pages/employee/customer-management/modal/ModalUpdateCustomer";
import ModalDetailCustomer from "./pages/employee/customer-management/modal/ModalDetailCustomer";
import DetailProductManagment from "./pages/employee/product-management/DetailProductManagment";
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
            path="/detail-product-management/:id"
            element={
              <AuthGuard>
                <DashBoardEmployee>
                  <DetailProductManagment />
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
            path="/staff-management"
            element={
              <AuthGuard>
                <DashBoardEmployee>
                  <AccountManagement />
                </DashBoardEmployee>
              </AuthGuard>
            }
          />
          <Route
            path="/create-staff-management"
            element={
              <AuthGuard>
                <DashBoardEmployee>
                  <ModalCreateAccount />
                </DashBoardEmployee>
              </AuthGuard>
            }
          />
          <Route
            path="/update-staff-management/:id"
            element={
              <AuthGuard>
                <DashBoardEmployee>
                  <ModalUpdateAccount />
                </DashBoardEmployee>
              </AuthGuard>
            }
          />
          <Route
            path="/detail-staff-management/:id"
            element={
              <AuthGuard>
                <DashBoardEmployee>
                  <ModalDetailAccount />
                </DashBoardEmployee>
              </AuthGuard>
            }
          />
          <Route
            path="/customerr-management"
            element={
              <AuthGuard>
                <DashBoardEmployee>
                  <CustomerManagement />
                </DashBoardEmployee>
              </AuthGuard>
            }
          />
          <Route
            path="/create-customer-management"
            element={
              <AuthGuard>
                <DashBoardEmployee>
                  <ModalCreateCustomer />
                </DashBoardEmployee>
              </AuthGuard>
            }
          />
          <Route
            path="/update-customer-management/:id"
            element={
              <AuthGuard>
                <DashBoardEmployee>
                  <ModalUpdateCustomer />
                </DashBoardEmployee>
              </AuthGuard>
            }
          />
          <Route
            path="/detail-customer-management/:id"
            element={
              <AuthGuard>
                <DashBoardEmployee>
                  <ModalDetailCustomer />
                </DashBoardEmployee>
              </AuthGuard>
            }
          />
          <Route
            path="/promotion-management"
            element={
              <AuthGuard>
                <DashBoardEmployee>
                  <PromotionManagement />
                </DashBoardEmployee>
              </AuthGuard>
            }
          />
          <Route
            path="/create-promotion-management"
            element={
              <AuthGuard>
                <DashBoardEmployee>
                  <CreatePromotionManagement />
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
