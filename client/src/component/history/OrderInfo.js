import React from "react";
import { Col, Row } from "reactstrap";
import OrderDetailList from "./OrderDetailList";

function OrderInfo({ userId, orderInfoData }) {
  return (
    <div>
      <Row>
        <Col>주문번호</Col>
        <Col>{orderInfoData.order_id}</Col>
      </Row>
      <Row>
        <Col>주문자</Col>
        <Col>{userId}</Col>
      </Row>
      <Row>
        <Col>수취인</Col>
        <Col>{orderInfoData.receive_user}</Col>
      </Row>
      <Row>
        <Col>배송지</Col>
        <Col>
          {orderInfoData.receive_address1} {orderInfoData.receive_address2}{" "}
          {orderInfoData.receive_address3}
        </Col>
      </Row>
      <Row>
        <Col>수취인 전화 번호</Col>
        <Col>
          {orderInfoData.receive_user_tel1} - {orderInfoData.receive_user_tel2}{" "}
          - {orderInfoData.receive_user_tel3}
        </Col>
      </Row>

      <Row>
        <Col>결제 정보</Col>
        <Col>
          {orderInfoData.card_user} {orderInfoData.cart_dv}{" "}
          {orderInfoData.card_number1}-XXXX-XXXX-XXXX
        </Col>
      </Row>
      <Row>
        {/* 주문 아이템 리스트 */}
        <Col>
          <OrderDetailList userId={userId} orderId={orderInfoData.order_id} />
        </Col>
      </Row>
      <Row>
        <Col>총 금액</Col>
        <Col>{orderInfoData.total_price}</Col>
      </Row>
    </div>
  );
}

export default OrderInfo;
