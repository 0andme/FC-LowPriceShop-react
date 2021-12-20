import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Table,
} from "reactstrap";
import CardListItem from "./CardListItem";

function CartList({ userId, cartId }) {
  const [cartList, setCartList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    getCartList();
  }, []);
  useEffect(() => {
    getTotalPrice();
  }, [cartList]);
  return (
    <Card>
      <CardHeader tag="h6">장바구니 목록</CardHeader>
      <CardBody>
        <CardTitle>{userId}님의 장바구니</CardTitle>
        <Table size="sm" hover>
          <thead>
            <tr>
              <th>번호</th>
              <th>상품</th>
              <th className="w-50">상품명</th>
              <th>가격</th>
              <th>개수</th>
              <th>총합</th>
            </tr>
          </thead>
          {cartList.length > 0 && (
            <tbody>
              {cartList.map((item, index) => {
                return (
                  <CardListItem
                    index={index + 1}
                    item={item}
                    key={item.product_id}
                  />
                );
              })}
              {cartList.length === 0 && <span>none</span>}
            </tbody>
          )}
        </Table>
      </CardBody>
      <CardFooter style={{ textAlign: "center" }} tag="h5">
        <span>총 금액</span>{" "}
        <span style={{ color: "tomato" }}>{totalPrice.toLocaleString()}원</span>
      </CardFooter>
    </Card>
  );
  // api - 장바구니 전체 목록 가져오기
  function getCartList() {
    axios
      .post("/api/cart?type=list", { user_id: userId })
      .then((res) => {
        try {
          const list = res.data.json;
          if (list) {
            setCartList(list);
          }
        } catch {
          alert(" 장바구니 목록을 가져오는 중 오류가 발생하였습니다.");
        }
      })
      .catch();
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

export default CartList;
