import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home></Home>} />
        </Route>
        <Route> {/*Admin layout*/}</Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
