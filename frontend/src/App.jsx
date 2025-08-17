import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import Login from "./pages/Login";
function App() {
  return (
<<<<<<< HEAD
    <BrowserRouter>
      <Toaster position="top-right" />
=======
    <BrowserRouter> 
>>>>>>> ccd226111875c4281617fca7ee59fced8d4ae1e8
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
