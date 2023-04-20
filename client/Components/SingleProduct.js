import React, { useEffect, useState } from "react";

// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { fetchSingleProduct } from "../app/SingleProductSlice";

function SingleProduct() {
  // const { id } = useParams();
  // const dispatch = useDispatch();
  // const product = useSelector((state) => state.SingleProduct);

  // useEffect(
  //   () => {
  //     dispatch(fetchSingleProduct(id));
  //   },
  //   [],
  // );

  return (
    <div>
      <h1>{product.Title}</h1>
      <img src={product.ImageUrl} />
      <p>{product.Description}</p>
      <h3>Price: ${product.Price}</h3>
    </div>
  );
}

export default SingleProduct;
