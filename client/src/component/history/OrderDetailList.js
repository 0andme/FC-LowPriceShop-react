import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import OrderDetailListItem from "./OrderDetailListItem";

function OrderDetailList({ userId, orderId }) {
  const [orderDetailList, setOrderDetailList] = useState([]);
  useEffect(() => {
    getOrderDetailList();
  }, []);
  return (
    <div style={{ border: "1px solid rgba(0,0,0,0.03)" }}>
      <Table>
        <thead>
          <tr>
            <th>번호</th>
            <th>상품</th>
            <th className="w-50">상품명</th>
            <th>수량</th>
            <th>총 가격</th>
          </tr>
        </thead>
        <tbody>
          {orderDetailList.map((item, index) => {
            return (
              <OrderDetailListItem
                item={item}
                index={index + 1}
                key={item.product_id}
              />
            );
          })}
        </tbody>
      </Table>
    </div>
  );
  function getOrderDetailList() {
    axios
      .post("/api/order?type=orderDetail", {
        user_id: userId,
        order_id: orderId,
      })
      .then((res) => {
        try {
          const list = res.data.json;
          if (list) {
            setOrderDetailList(list);
          }
        } catch {
          alert("주문 상품 내역을 가져오는 중 오류가 발생하였습니다");
        }
      })
      .catch();
  }
}

export default OrderDetailList;
