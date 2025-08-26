import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectiomPage from "./pages/CollectiomPage";

import ProductDetails from "./components/Products/ProductDetails";
import Checkout from "./components/Cart/Checkout";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import { MyOrdersPage } from "./pages/MyOrdersPage";

function App() {
  return (
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
            element={<CollectiomPage></CollectiomPage>}
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

        <Route> {/*Admin layout*/}</Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
