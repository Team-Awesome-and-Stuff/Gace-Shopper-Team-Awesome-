import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import SingleProductPreview from "./SingleProductPreview";
import SingleProduct from "./SingleProduct";
import { fetchProducts } from "../slices/ProductsSlice";

const Products = () => {
  const dispatch = useDispatch;
  const [product, setProduct] = useState(product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="product-container">
      {product ? (
        product.map((singleProduct, index) => (
          <div className="products" key={index}>
            <NavLink to={`/products/${singleProduct.id}`}>
              <SingleProductPreview products={singleProduct} />
            </NavLink>
          </div>
        ))
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Products;
