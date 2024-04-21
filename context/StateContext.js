import product from "@/te-and-t/schemaTypes/product";
import React, { createContext, useContext, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
const Context = createContext();
export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantites, setTotalQuantites] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantites((prevTotalQuantity) => prevTotalQuantity + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        return cartProduct;
      });
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const toggleCartItemQuantity = (id, value) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item._id === id) {
        if (value === "inc") {
          return { ...item, quantity: item.quantity + 1 };
        } else if (value === "dec" && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
      }
      return item;
    });

    // Update total price and quantities
    const updatedTotalPrice = updatedCartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const updatedTotalQuantities = updatedCartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );

    setCartItems(updatedCartItems);
    setTotalPrice(updatedTotalPrice);
    setTotalQuantites(updatedTotalQuantities);
  };
  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantites(
      (prevTotalQuantity) => prevTotalQuantity - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantites,
        qty,
        incQty,
        decQty,
        onAdd,
        setShowCart,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantites,
      }}
    >
      <Toaster />
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
