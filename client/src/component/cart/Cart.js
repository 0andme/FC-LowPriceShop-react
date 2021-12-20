import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import CartList from "./CartList";
import axios from "axios";

function Cart({ userId }) {
  const [cartId, setCartId] = useState("");
  useEffect(() => {
    getCartId();
  }, []);
  return (
    <Container className="mainContent">
      <h2>장바구니</h2>
      {/* 카트 목록 */}
      <CartList cartId={cartId} userId={userId}></CartList>
      {/*  배송지 입력*/}
      {/* 결제 */}
    </Container>
  );
  // api- CartId 조회
  function getCartId() {
    axios
      .post("/api/cart?type=cart_id", { user_id: userId })
      .then((res) => {
        try {
          const data = res.data.json;
          if (data) {
            const cartId = data[0].cart_id;
            setCartId(cartId);
          }
        } catch {
          alert("Cart Id 조회 중 오류가 발생하였습니다.");
        }
      })
      .catch(() => {});
  }
}

export default Cart;
