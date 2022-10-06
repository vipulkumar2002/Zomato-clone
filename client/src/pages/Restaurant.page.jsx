import React from "react";
import RestaurantLayout from "../layouts/Restaurent.layout";
import { Outlet } from "react-router-dom";

const RestaurantPage = () => {
  return (
    <>
      RestaurantPage
      <Outlet />
    </>
  );
};

export default RestaurantLayout(RestaurantPage);
