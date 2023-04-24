import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../slices/ProductsSlice";
import { Link } from "react-router-dom";

function cartProducts() {
  const dispatch = useDispatch;
  const { userId } = useParams;
  const cartList = useSelector((state) => state.cart);
  const cartId = useSelector((state) => state.auth.me.cartId);

  useEffect(() => {
    {
      dispatch(fetchProducts(userId));
    }
  }, [dispatch]);

  const totalCost = cartList.reduce(
    (total, item) => item.cartProduct.quantity + total * item.price,
    0
  );

  const changeAmount = (productId, newAmount) => {
    if (!newAmount) {
      return;
    }
    dispatch(newQuantityAmount({ cartId, productId, quantity: newAmount }));
  };

  const deleteProduct = (productId) => {
    dispatch(deleteProductFromCart(cartId, productId));
  };

  const checkoutProducts = (productId) => {
    dispatch(checkoutMyCart(cartId, productId));
  };

  return (
    <>
      <div>
        <h1>My Cart</h1>
        {cartList.length === 0}(<div>Nothing in Cart</div>
        )(
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Description</th>
            </tr>
          </thead>
        </table>
        );
      </div>
      <div id="itemsInMyCart">
        {products && products.length
          ? products.map((item) => {
              return (
                <div key={`items inCart:${item.id}`}>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(event) =>
                      changeAmount(
                        item.product.id,
                        parseInt(event.target.valueAsNumber)
                      )
                    }
                  />
                  <button onClick={() => deleteProduct(item.Product.id)}>
                    Remove this item
                  </button>
                </div>
              );
            })
          : "Your Cart Is Empty :("}
      </div>
      <div id="cartTotal">
        <p>Total Cost: ${totalCost}</p>
      </div>
      <Link to="/Checkout">
        <button id="checkout" onClick={() => checkoutProducts(item.product.id)}>
          Proceed to Checkout
        </button>
      </Link>
    </>
  );
}
export default cartProducts;
