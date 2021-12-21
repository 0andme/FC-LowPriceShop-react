import React, { useState } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import OrderDetailList from "./OrderDetailList";
import OrderInfo from "./OrderInfo";

function OrderListItem({ item, index, userId }) {
  const [isItemOpen, setIsItemOpen] = useState(false);
  const orderInfoData = {
    order_id: item.order_id,
    total_price: item.total_price,
    receive_user: item.receive_user,
    receive_user_tel1: item.receive_user_tel1,
    receive_user_tel2: item.receive_user_tel2,
    receive_user_tel3: item.receive_user_tel3,
    receive_address1: item.receive_address1,
    receive_address2: item.receive_address2,
    receive_address3: item.receive_address3,
    cart_dv: item.cart_dv,
    card_user: item.card_user,
    card_number1: item.card_number1,
  };
  return (
    <>
      <tr
        className="orderItem"
        onClick={() => {
          setIsItemOpen(!isItemOpen);
        }}
      >
        <td>{index}</td>
        <td>{item.order_id}</td>
        <td>{item.receive_user}</td>
        <td>{item.total_price}</td>
        <td>{item.insert_date}</td>
      </tr>
      {isItemOpen && (
        <tr
          className="orderDetailItem"
          onClick={() => {
            setIsItemOpen(false);
          }}
        >
          <td colSpan="5">
            <Card>
              <CardHeader>주문서</CardHeader>
              <CardBody>
                {/* 주문 정보 */}
                <OrderInfo
                  userId={userId}
                  orderId={item.order_id}
                  orderInfoData={orderInfoData}
                />
              </CardBody>
            </Card>
          </td>
        </tr>
      )}
    </>
  );
}

export default OrderListItem;
