import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import {
  AvForm,
  AvField,
  AvGroup,
  AvInput,
  AvFeedback,
} from "availity-reactstrap-validation";

function CartCardFrom({
  setIsVaildCardForm,
  submitBtnClick,
  setSubmitBtnClick,
  formData,
  setFromData,
}) {
  const formRef = useRef();
  useEffect(() => {
    if (submitBtnClick) {
      formRef.current.submit();
      setSubmitBtnClick(false);
    }
  }, [submitBtnClick]);
  return (
    <Card className="p-0">
      <CardHeader>결제 정보</CardHeader>
      <CardBody>
        <AvForm
          onValidSubmit={() => {
            setIsVaildCardForm(true);
          }}
          onInvalidSubmit={() => {
            setIsVaildCardForm(false);
          }}
          ref={formRef}
        >
          {/* 카드 선택*/}
          <AvGroup>
            <Label>카드 선택</Label>
            <AvField
              required
              type="select"
              name="cart_dv"
              id="cart_dv"
              valid={formData.cart_dv !== ""}
              invalid={formData.cart_dv === ""}
              errorMessage="카드를 선택하세요"
              onChange={(e) => {
                setFromData({
                  ...formData,
                  cart_dv: e.target.value,
                });
              }}
            >
              <option value hidden>
                카드를 선택하세요
              </option>
              <option>국민 카드</option>
              <option>신한 카드</option>
              <option>하나 카드</option>
              <option>롯데 카드</option>
              <option>BC 카드</option>
              <option>농협 카드</option>
              <option>현대 카드</option>
              <option>삼성 카드</option>
            </AvField>
          </AvGroup>
          {/* 성명 입력 */}

          <AvGroup>
            <Label for="card_user">성명</Label>
            <AvField
              required
              id="card_user"
              name="card_user"
              placeholder="이름"
              type="text"
              errorMessage="20자 이하의 이름을 적어주세요"
              valid={
                formData.card_user !== "" && formData.card_user.length <= 20
              }
              invalid={
                formData.card_user === "" || formData.card_user.length > 20
              }
              onChange={(e) => {
                setFromData({ ...formData, card_user: e.target.value });
              }}
            ></AvField>
          </AvGroup>
          {/* 카드 번호 입력*/}
          <AvGroup>
            <Label>카드 번호</Label>
            <div style={{ display: "flex" }}>
              {/* 카드 번호 1 */}
              <AvInput
                required
                id="card_number1"
                name="card_number1"
                placeholder="XXXX"
                type="text"
                valid={
                  !isNaN(formData.card_number1) &&
                  formData.card_number1.length === 4
                }
                invalid={
                  isNaN(formData.card_number1) ||
                  formData.card_number1.length !== 4
                }
                onChange={(e) => {
                  setFromData({
                    ...formData,
                    card_number1: e.target.value,
                  });
                }}
              ></AvInput>
              <span style={{ margin: "0 5px" }}>-</span>
              {/* 카드 번호 2 */}
              <AvInput
                required
                id="card_number2"
                name="card_number2"
                placeholder="XXXX"
                type="text"
                valid={
                  !isNaN(formData.card_number2) &&
                  formData.card_number2.length === 4
                }
                invalid={
                  isNaN(formData.card_number2) ||
                  formData.card_number2.length !== 4
                }
                onChange={(e) => {
                  setFromData({
                    ...formData,
                    card_number2: e.target.value,
                  });
                }}
              ></AvInput>
              <span style={{ margin: "0 5px" }}>-</span>
              {/* 카드 번호 3 */}
              <AvInput
                required
                id="card_number3"
                name="card_number3"
                placeholder="XXXX"
                type="text"
                valid={
                  !isNaN(formData.card_number3) &&
                  formData.card_number3.length === 4
                }
                invalid={
                  isNaN(formData.card_number3) ||
                  formData.card_number3.length !== 4
                }
                onChange={(e) => {
                  setFromData({
                    ...formData,
                    card_number3: e.target.value,
                  });
                }}
              ></AvInput>
              <span style={{ margin: "0 5px" }}>-</span>
              {/* 카드 번호 4 */}
              <AvInput
                required
                id="card_number4"
                name="card_number4"
                placeholder="XXXX"
                type="text"
                valid={
                  !isNaN(formData.card_number4) &&
                  formData.card_number4.length === 4
                }
                invalid={
                  isNaN(formData.card_number4) ||
                  formData.card_number4.length !== 4
                }
                onChange={(e) => {
                  setFromData({
                    ...formData,
                    card_number4: e.target.value,
                  });
                }}
              ></AvInput>
            </div>
          </AvGroup>
          {/* 카드 년/월 입력 */}
          <AvGroup>
            <Label>카드 유효기간</Label>
            <div style={{ display: "flex" }}>
              {/* 카드 년도 */}
              <AvInput
                required
                id="card_year"
                name="card_year"
                placeholder="연도 YY"
                type="text"
                valid={
                  !isNaN(formData.card_year) &&
                  RegExp(/^[0-9]{2}$/).test(formData.card_year) // formData.card_year > 0 &&
                }
                invalid={
                  isNaN(formData.card_year) ||
                  !RegExp(/^[0-9]{2}$/).test(formData.card_year)
                }
                onChange={(e) => {
                  setFromData({
                    ...formData,
                    card_year: e.target.value,
                  });
                }}
              ></AvInput>
              <span style={{ margin: "0 5px" }}>-</span>
              {/* 카드 월 입력 */}
              <AvInput
                required
                id="card_month"
                name="card_month"
                placeholder="월 MM "
                valid={
                  !isNaN(formData.card_month) &&
                  RegExp(/^(0[1-9]|1[0-2])$/).test(formData.card_month) // formData.card_year > 0 &&
                }
                invalid={
                  isNaN(formData.card_month) ||
                  !RegExp(/^(0[1-9]|1[0-2])$/).test(formData.card_month)
                }
                type="text"
                onChange={(e) => {
                  setFromData({
                    ...formData,
                    card_month: e.target.value,
                  });
                }}
              ></AvInput>
            </div>
          </AvGroup>
        </AvForm>
      </CardBody>
    </Card>
  );
}

export default CartCardFrom;
