import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Product() {
  // const { id } = useParams();
  // const dispatch = useDispatch();
  // const product = useSelector((state) => state.Product);

  // useEffect(
  //   () => {
  //     dispatch(fetchProduct(id));
  //   },
  //   [dispatch],
  //   id
  // );

  // const productToCart = (productId) => {
  //   dispatch(addProductToCart({ userId, productId }));
  // };

  const Product = {
    name: "crank chop",
    price: 10.99,
    quantity: 20,
    imageUrl:
      "https://jeffersonvalleymall.com/images/default-source/store-logos/store-logos/as-seen-on-tv.tmb-t-400x400.png?sfvrsn=f8ff2078_7",
    description: "hello",
  };

  return (
    <div id=" Product" className="column">
      <div id=" Product Info" className="row">
        <div className="First Column"></div>
        <h1>{Product.name}</h1>
        <img src={Product.imageUrl} />
        <h3>{Product.price}</h3>
        <h4>{Product.description}</h4>
        <button
          onClick={() => {
            addProductToCart(product.Id);
          }}
        >
          Add product to cart
        </button>
      </div>
    </div>
  );
}

export default Product;
