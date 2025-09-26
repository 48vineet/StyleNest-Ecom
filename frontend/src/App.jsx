import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
  
import ProductDetails from "./components/Products/ProductDetails";
import Checkout from "./components/Cart/Checkout";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import { MyOrdersPage } from "./pages/MyOrdersPage";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminHomepage from "./pages/AdminHomepage";
import UserManagement from "./components/Admin/UserManagement";
import ProductManagment from "./components/Admin/ProductManagment";
import EditProductPage from "./components/Admin/EditProductPage";
import OrderManagment from "./components/Admin/OrderManagment";

import { Provider } from "react-redux";
import store from "./redux/store";
import ProtectedRoutes from "./components/Common/ProtectedRoutes";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home></Home>} />
            <Route path="login" element={<Login></Login>}></Route>
            <Route path="register" element={<Register></Register>}></Route>
            <Route path="profile" element={<Profile></Profile>}></Route>
            <Route
              path="collections/:collection"
              element={<CollectionPage></CollectionPage>}
            ></Route>
            <Route
              path="product/:id"
              element={<ProductDetails></ProductDetails>}
            ></Route>
            <Route path="checkout" element={<Checkout></Checkout>}></Route>
            <Route
              path="order-confirmation"
              element={<OrderConfirmationPage></OrderConfirmationPage>}
            ></Route>
            <Route
              path="order/:id"
              element={<OrderDetailsPage></OrderDetailsPage>}
            ></Route>
            <Route
              path="/my-orders"
              element={<MyOrdersPage></MyOrdersPage>}
            ></Route>
          </Route>

          <Route
            path="/admin"
            element={
              <ProtectedRoutes role="admin">
                <AdminLayout />
              </ProtectedRoutes>
            }
          >
            <Route index element={<AdminHomepage />}></Route>
            <Route path="users" element={<UserManagement />} />
            <Route path="products" element={<ProductManagment />} />
            <Route path="products/:id/edit" element={<EditProductPage />} />
            <Route path="orders" element={<OrderManagment />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
