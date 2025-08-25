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
        </Route>
        <Route> {/*Admin layout*/}</Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
