import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import CartList from "./CartList";
import axios from "axios";
import CartOrderForm from "./CartOrderForm";

function Cart({ userId }) {
  const [cartId, setCartId] = useState("");
  const [cartList, setCartList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    getCartList();
  }, []);
  useEffect(() => {
    if (cartList.length > 0) {
      getTotalPrice();
    }
  }, [cartList]);

  useEffect(() => {
    getCartId();
  }, []);
  return (
    <Container className="mainContent">
      <h2>장바구니</h2>
      {/* 카트 목록 */}
      <CartList
        cartList={cartList}
        totalPrice={totalPrice}
        cartId={cartId}
        userId={userId}
      ></CartList>

      {/*  배송지 입력*/}
      <CartOrderForm
        totalPrice={totalPrice}
        cartId={cartId}
        userId={userId}
      ></CartOrderForm>
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
  // api - 장바구니 전체 목록 가져오기
  function getCartList() {
    axios
      .post("/api/cart?type=list", { user_id: userId })
      .then((res) => {
        try {
          const list = res.data.json;
          if (list) {
            // console.log(list);
            setCartList(list);
          }
        } catch {}
      })
      .catch(() => {
        alert(" 장바구니 목록을 가져오는 중 오류가 발생하였습니다.");
      });
  }
  // api - 장바구니 전체 금액 출력하기
  function getTotalPrice() {
    axios
      .post("/api/cart?type=totalPrice", { cart_id: cartId, user_id: userId })
      .then((res) => {
        try {
          const price = res.data.json;
          if (price) {
            setTotalPrice(price[0].total_price);
          }
        } catch {
          alert(" 장바구니 목록을 가져오는 중 오류가 발생하였습니다.");
        }
      })
      .catch();
  }
}

export default Cart;
