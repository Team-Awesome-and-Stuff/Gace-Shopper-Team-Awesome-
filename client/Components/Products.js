import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import SingleProduct from "./SingleProduct";

const products = [
  {
    name: "crank chop",
    price: 10.99,
    quantity: 20,
    imageUrl:
      "https://jeffersonvalleymall.com/images/default-source/store-logos/store-logos/as-seen-on-tv.tmb-t-400x400.png?sfvrsn=f8ff2078_7",
  },
  {
    name: "flex shot",
    price: 7.99,
    quantity: 50,
    imageUrl:
      "https://jeffersonvalleymall.com/images/default-source/store-logos/store-logos/as-seen-on-tv.tmb-t-400x400.png?sfvrsn=f8ff2078_7",
  },
];

const Products = () => {
  //   useEffect(() => {}, []);
  const [product, setProduct] = useState(products);

  return (
    <div className="product-container">
      {product ? (
        product.map((products) => (
          <div className="products" key={products.id}>
            <NavLink to={`/products/${products.id}`}>
              <SingleProduct products={products} />
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

//<SingleProduct />
