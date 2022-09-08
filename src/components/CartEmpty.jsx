import React from "react";
import cartEmptyImage from "../assets/img/empty-cart.png";
import { Link } from "react-router-dom";

const CartEmpty = () => {
  return (
    <>
      <div class="cart cart--empty">
        <h2>Cart is empty</h2>
        <p>its because you did not ordered pizza</p>
        <img src={cartEmptyImage} />
        <Link to="/" class="button button--black">
          <span>back to order</span>
        </Link>
      </div>
    </>
  );
};

export default CartEmpty;
