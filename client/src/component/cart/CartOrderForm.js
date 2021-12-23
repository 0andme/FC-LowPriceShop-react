import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "reactstrap";
import CartCardFrom from "./CartCardFrom";
import CartDeliveryForm from "./CartDeliveryForm";
import axios from "axios";

function CartOrderForm({ cartId, userId, totalPrice, setIsOrderd }) {
  const [deliveryData, setDeliveryData] = useState({
    receive_user: "",
    receive_user_tel1: "",
    receive_user_tel2: "",
    receive_user_tel3: "",
    receive_address1: "",
    receive_address2: "",
    receive_address3: "",
  });
  const [cardData, setCardData] = useState({
    card_user: "",
    cart_dv: "",
    card_number1: "",
    card_number2: "",
    card_number3: "",
    card_number4: "",
    card_month: "",
    card_year: "",
  });
  const [submitBtnClick, setSubmitBtnClick] = useState(false);
  const [isVaildCardForm, setIsVaildCardForm] = useState(false);
  const [isVaildDeliForm, setIsVaildDeliForm] = useState(false);

  useEffect(() => {
    if (isVaildCardForm && isVaildDeliForm) {
      // 구매 시작
      if (window.confirm("상품을 구매하시겠습니까?")) {
        orderItem();
      }
    }
  }, [isVaildCardForm, isVaildDeliForm]);
  return (
    <Row style={{ marginTop: "30px " }}>
      <Col>
        <CartDeliveryForm
          setIsVaildDeliForm={setIsVaildDeliForm}
          setSubmitBtnClick={setSubmitBtnClick}
          submitBtnClick={submitBtnClick}
          formData={deliveryData}
          setFromData={setDeliveryData}
        />
      </Col>
      {/* 카드 정보 입력 폼 */}
      <Col>
        <Row>
          <CartCardFrom
            setIsVaildCardForm={setIsVaildCardForm}
            setSubmitBtnClick={setSubmitBtnClick}
            submitBtnClick={submitBtnClick}
            formData={cardData}
            setFromData={setCardData}
          />
        </Row>
        <Row>
          <Button
            type="submit"
            style={{ height: "50px" }}
            onClick={() => {
              setSubmitBtnClick(true);
            }}
          >
            구매하기
          </Button>
        </Row>
      </Col>
    </Row>
  );

  function orderItem() {
    axios
      .post("/api/cart?type=order", {
        ...cardData,
        ...deliveryData,
        complete_yn: "Y",
        cart_id: cartId,
        total_price: totalPrice,
        user_id: userId,
      })
      .then(() => {
        axios
          .post("/api/cart?type=modify", {
            cart_id: cartId,
            complete_yn: "Y",
            user_id: userId,
          })
          .then(() => {
            alert("구매성공");
            setIsOrderd(true);
          })
          .catch();
      })
      .catch(() => {
        alert("구매실패");
      });
  }
}

export default CartOrderForm;
