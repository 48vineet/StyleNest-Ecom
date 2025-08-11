import React from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      {/* header */}
      <Header></Header>
      {/* Main Content */}
      <main>
        <Outlet></Outlet>
      </main>
      {/* Footer section */}
      <Footer></Footer>
    </>
  );
};

export default UserLayout;
