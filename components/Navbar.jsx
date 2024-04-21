import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import Cart from "./Cart";
import { useStateContext } from "../context/StateContext";
const Navbar = () => {
  const { showCart, setShowCart, totalQuantites } = useStateContext();
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Te&T Hedphones</Link>
      </p>

      <button
        className="cart-icon"
        type="button"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantites}</span>
      </button>
      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
