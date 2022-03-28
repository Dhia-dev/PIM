import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import AddProductMain from "../components/Profile/profile22";

const AddProfile = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddProductMain />
      </main>
    </>
  );
};

export default AddProfile;
