import React, { useEffect, useState } from "react";

function SingleProductPreview(props) {
  const { name, imageUrl, price } = props.products;
  console.log(name);

  return (
    <div>
      <h1>{name}</h1>
      <img src={imageUrl} />
      <h3>Price: ${price}</h3>
    </div>
  );
}

export default SingleProductPreview;
