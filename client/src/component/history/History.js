import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Card, CardBody, CardHeader, Container } from "reactstrap";
import OrderList from "./OrderList";
import PageNav from "./PageNav";

function History({ userId }) {
  const displayCnt = 5;
  const [orderTotalNum, setOrderTotalNum] = useState(0);
  const [pageNum, setPageNum] = useState(0);
  const pageNavNum = useMemo(() => {
    return Math.ceil(orderTotalNum / displayCnt);
  }, [orderTotalNum]);
  useEffect(() => {
    getOrderTotalNum();
  }, []);
  return (
    <Container className="mainContent">
      <h2>주문 내역 조회</h2>
      <Card>
        <CardHeader>내 주문 정보</CardHeader>
        {/* 주문 정보 리스트 */}
        <CardBody>
          <OrderList
            pageNum={pageNum}
            displayCnt={displayCnt}
            userId={userId}
          />
          <PageNav pageNavNum={pageNavNum} setPageNum={setPageNum}></PageNav>
        </CardBody>
      </Card>
    </Container>
  );
  function getOrderTotalNum() {
    axios
      .post("/api/order?type=count", { user_id: userId })
      .then((response) => {
        try {
          const cnt = response.data.json;
          if (cnt) {
            setOrderTotalNum(cnt[0].total_count);
          }
        } catch (error) {
          console.log(error);
          alert("작업 중 오류가 발생하였습니다.");
        }
      })
      .catch((error) => {});
  }
}

export default History;
