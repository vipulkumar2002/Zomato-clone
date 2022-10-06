import React from "react";

const CheckoutLayout =
  (Component) =>
  ({ ...props }) => {
    return (
      <>
        <h1>CheckoutLayout</h1>
        <Component {...props} />
      </>
    );
  };

export default CheckoutLayout;
