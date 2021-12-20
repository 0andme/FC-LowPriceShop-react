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
import CartListItem from "./CartListItem";

function CartList({ userId, cartId, cartList, totalPrice }) {
  return (
    <Card>
      <CardHeader tag="h6">장바구니 목록</CardHeader>
      <CardBody>
        <CardTitle>{userId}님의 장바구니</CardTitle>
        {cartList.length > 0 && (
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

            <tbody>
              {cartList.map((item, index) => {
                return (
                  <CartListItem
                    index={index + 1}
                    item={item}
                    key={item.product_id}
                  />
                );
              })}
            </tbody>
          </Table>
        )}
        {cartList.length === 0 && <span>장바구니에 상품이 없습니다</span>}
      </CardBody>
      <CardFooter style={{ textAlign: "center", marginBottom: "0" }} tag="h5">
        <span>총 금액</span>{" "}
        <span style={{ color: "tomato" }}>{totalPrice.toLocaleString()}원</span>
      </CardFooter>
    </Card>
  );
}

export default CartList;
