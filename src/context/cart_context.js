import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/cart_reducer";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../actions";

// khởi tạo localstorage , ban đầu nếu trong cart có phần tử trước đó
// thì gán cho giá trị khởi tạo bằng cart đã lưu trước đó
const getLocalStorage = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(localStorage.getItem("cart"));
  } else {
    return [];
  }
};

const initialState = {
  cart: getLocalStorage(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 534,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // add to cart
  const addToCart = (id, color, amount, product) => {
    // console.log(id, color, amount, product);
    dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } });
  };

  // remove items from cart
  const removeItem = (id) => {
    // console.log(id);
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  };

  // toggle amount
  const toggleAmount = (id, value) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
    // console.log(id, value);
  };

  // cleaar cartItem
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  // const countCartTotals = () => {
  //   const count = state.cart.reduce((total, item) => {
  //     return total + item.amount;
  //   }, 0);
  //   dispatch({ type: COUNT_CART_TOTALS, payload: count });
  // };

  //  mỗi khi cart thay đổi thì lưu nó vào local storage

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
    // dispatch({ type: COUNT_CART_TOTALS });
  }, [state.cart]);
  // console.log(state);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        toggleAmount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
