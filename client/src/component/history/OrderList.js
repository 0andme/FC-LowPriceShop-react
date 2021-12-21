import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import OrderListItem from "./OrderListItem";

function OrderList({ userId }) {
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    getOrderList();
  }, []);
  return (
    <div>
      <Table size="sm" hover>
        <thead>
          <tr>
            <th>번호</th>
            <th>주문 번호</th>
            <th>받는 분</th>
            <th>가격</th>
            <th>주문 일시</th>
          </tr>
        </thead>
        {orderList.length > 0 && (
          <tbody>
            {orderList.map((item, index) => {
              return (
                <OrderListItem
                  userId={userId}
                  index={index + 1}
                  item={item}
                  key={item.product_id}
                />
              );
            })}
          </tbody>
        )}
      </Table>
    </div>
  );
  function getOrderList() {
    axios
      .post("/api/order?type=list", {
        user_id: userId,
      })
      .then((res) => {
        try {
          const list = res.data.json;
          if (list.length) {
            setOrderList(list);
          }
        } catch {
          alert("주문 내역을 가져오는 중 오류가 발생하였습니다");
        }
      })
      .catch();
  }
}

export default OrderList;
