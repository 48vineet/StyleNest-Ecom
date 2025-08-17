import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import Login from "./pages/Login";
function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home></Home>} />
          <Route path="login" element={<Login></Login>}></Route>
        </Route>
        <Route> {/*Admin layout*/}</Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
