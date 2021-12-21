import React from "react";
import { Card, CardHeader, Container } from "reactstrap";
import OrderList from "./OrderList";

function History({ userId }) {
  return (
    <Container className="mainContent">
      <h2>주문 내역 조회</h2>
      <Card>
        <CardHeader>내 주문 정보</CardHeader>
        {/* 주문 정보 리스트 */}
        <OrderList userId={userId} />
      </Card>
    </Container>
  );
}

export default History;
