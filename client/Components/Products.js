import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

const Product = () => {
  useEffect(() => {}, []);
};

return (
  <>
    <div className="product-container">
      {products.map((products) => (
        <div className="products " key={products.id}>
          <NavLink to={`/products/${products.id}`}>
            <img className="product-images" src={products.ImageUrl} />
            <h2> {products.Title}</h2>
            <h3> Price: ${products.Price}</h3>
          </NavLink>
        </div>
      ))}
    </div>
  </>
);

export default Product;
