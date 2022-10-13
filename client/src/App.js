import "./App.css";

//packages
import { Routes, Route, Navigate } from "react-router-dom";

// pages
import HomePage from "./pages/Home.page";
import GoogleAuthPage from "./pages/GoogleAuth.page";
import CheckoutPage from "./pages/Checkout.page";
import Restaurant from "./pages/Restaurant.page";

// restaurant components
import Menus from "./components/Restaurant/Menu";
import OrderOnline from "./components/Restaurant/OrderOnline";
import Overview from "./components/Restaurant/Overview";
import Photos from "./components/Restaurant/Photos";
import Reviews from "./components/Restaurant/Review";
import RestaurantLayout from "./layouts/Restaurent.layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/delivery" />} />
        <Route path="/:type" element={<HomePage />} />
        <Route path="/google/:token" element={<GoogleAuthPage />} />
        <Route
          path="/restaurant/:id"
          element={
            <RestaurantLayout>
              <Restaurant />
            </RestaurantLayout>
          }
        >
          <Route path="overview" element={<Overview />} />
          <Route path="orderOnline" element={<OrderOnline />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="menus" element={<Menus />} />
          <Route path="photos" element={<Photos />} />
        </Route>
        <Route path="checkout/orders" element={<CheckoutPage />} />
      </Routes>
    </>
  );
}

export default App;
