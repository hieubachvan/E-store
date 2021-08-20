import React from "react";
import styled from "styled-components";
import { useCartContext } from "../context/cart_context";
import { useUserContext } from "../context/user_context";
import { formatPrice } from "../utils/helpers";
import { Link } from "react-router-dom";

const CartTotals = () => {
  const { cart } = useCartContext();
  const subTotal = cart.reduce((total, item) => {
    return total + item.price * item.amount;
  }, 0);
  // console.log(subTotal, cart);
  const orderTotal = subTotal + 534;
  // console.log(orderTotal);
  return (
    <Wrapper>
      <div>
        <article>
          <h5>
            Subtotal:
            <span>{formatPrice(subTotal)}</span>
          </h5>
          <p>
            Shipping Fee:
            <span>{formatPrice(534)}</span>
          </p>
          <hr />
          <h4>
            Order Total:
            <span>{formatPrice(orderTotal)}</span>
          </h4>
        </article>
        <button className="btn">login</button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  article {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 1.5rem 3rem;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
  p {
    text-transform: capitalize;
  }
  h4 {
    margin-top: 2rem;
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
  }
`;

export default CartTotals;
