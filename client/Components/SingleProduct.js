import React, { useEffect, useState } from "react";

// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { fetchSingleProduct } from "../app/SingleProductSlice";

function SingleProduct(props) {
  console.log(props);
  const { name, imageUrl, price } = props;

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
      <h1>{name}</h1>
      <img src={imageUrl} />
      <h3>Price: ${price}</h3>
    </div>
  );
}

export default SingleProduct;
