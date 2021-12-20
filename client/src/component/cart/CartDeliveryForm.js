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
  AvInput,
  AvForm,
  AvField,
  AvGroup,
  AvFeedback,
} from "availity-reactstrap-validation";
function CartDeliveryForm({
  setIsVaildDeliForm,
  submitBtnClick,
  setSubmitBtnClick,
  formData,
  setFromData,
}) {
  const formDeliveryRef = useRef();
  useEffect(() => {
    if (submitBtnClick) {
      formDeliveryRef.current.submit();
      setSubmitBtnClick(false);
    }
  }, [submitBtnClick]);
  return (
    <Card>
      <CardHeader>기본/배송정보</CardHeader>
      <CardBody>
        <AvForm
          ref={formDeliveryRef}
          onValidSubmit={() => {
            setIsVaildDeliForm(true);
          }}
          onInvalidSubmit={() => {
            setIsVaildDeliForm(false);
          }}
        >
          {/* 받으시는분 입력*/}
          <AvGroup>
            <Label for="receive_user">받으시는 분</Label>
            <AvField
              required
              id="receive_user"
              name="receive_user"
              placeholder="받으시는 분"
              errorMessage="20자 이하의 이름을 적어주세요"
              type="text"
              valid={
                formData.receive_user !== "" &&
                formData.receive_user.length <= 20
              }
              invalid={
                formData.receive_user === "" ||
                formData.receive_user.length > 20
              }
              onChange={(e) => {
                setFromData({ ...formData, receive_user: e.target.value });
              }}
            />
            <AvFeedback></AvFeedback>
          </AvGroup>
          {/* 전화번호 입력*/}
          <AvGroup>
            <Label for="receive_user_tel">전화번호</Label>
            <div style={{ display: "flex" }}>
              {/* 전화번호 1번째 */}
              <AvInput
                required
                id="receive_user_tel1"
                name="receive_user_tel1"
                placeholder="010"
                type="text"
                valid={formData.receive_user_tel1.length === 3}
                invalid={formData.receive_user_tel1.length !== 3}
                onChange={(e) => {
                  setFromData({
                    ...formData,
                    receive_user_tel1: e.target.value,
                  });
                }}
              ></AvInput>
              <span style={{ margin: "0 5px" }}>-</span>
              {/* 전화번호 2번째 */}
              <AvInput
                required
                id="receive_user_tel2"
                name="receive_user_tel2"
                placeholder="XXXX"
                type="text"
                valid={
                  !isNaN(formData.receive_user_tel2) &&
                  formData.receive_user_tel2.length === 4
                }
                invalid={
                  isNaN(formData.receive_user_tel2) ||
                  formData.receive_user_tel2.length !== 4
                }
                onChange={(e) => {
                  setFromData({
                    ...formData,
                    receive_user_tel2: e.target.value,
                  });
                }}
              ></AvInput>
              <span style={{ margin: "0 5px" }}>-</span>
              {/* 전화번호 3번째 */}
              <AvInput
                required
                id="receive_user_tel3"
                name="receive_user_tel3"
                placeholder="XXXX"
                type="text"
                valid={
                  !isNaN(formData.receive_user_tel3) &&
                  formData.receive_user_tel3.length === 4
                }
                invalid={
                  isNaN(formData.receive_user_tel3) ||
                  formData.receive_user_tel3.length !== 4
                }
                onChange={(e) => {
                  setFromData({
                    ...formData,
                    receive_user_tel3: e.target.value,
                  });
                }}
              ></AvInput>
            </div>
          </AvGroup>
          {/* 배송지 입력 */}
          <AvGroup>
            <Label for="receive_address">베송주소</Label>
            {/* 주소 1 */}
            <AvField
              required
              id="receive_address1"
              name="receive_address1"
              errorMessage="50자 이하로 작성해주세요"
              placeholder="ex) 서울시"
              type="text"
              valid={
                formData.receive_address1 !== "" &&
                formData.receive_address1.length <= 50
              }
              invalid={
                formData.receive_address1 === "" ||
                formData.receive_address1.length > 50
              }
              onChange={(e) => {
                setFromData({
                  ...formData,
                  receive_address1: e.target.value,
                });
              }}
            ></AvField>
            {/* 주소 2 */}
            <AvField
              required
              id="receive_address2"
              name="receive_address2"
              placeholder="ex) 강남구 테헤란로 231 "
              type="text"
              errorMessage="50자 이하로 작성해주세요"
              valid={
                formData.receive_address2 !== "" &&
                formData.receive_address2.length <= 50
              }
              invalid={
                formData.receive_address2 === "" ||
                formData.receive_address2.length > 50
              }
              onChange={(e) => {
                setFromData({
                  ...formData,
                  receive_address2: e.target.value,
                });
              }}
            ></AvField>
            <span>상세주소</span>
            {/* 주소 3 */}
            <AvField
              required
              id="receive_address_plus3"
              name="receive_address_plus3"
              placeholder="ex) 센터필드 6층 "
              type="text"
              errorMessage="50자 이하로 작성해주세요"
              valid={
                formData.receive_address3 !== "" &&
                formData.receive_address3.length <= 50
              }
              invalid={
                formData.receive_address3 === "" ||
                formData.receive_address3.length > 50
              }
              onChange={(e) => {
                setFromData({
                  ...formData,
                  receive_address3: e.target.value,
                });
              }}
            ></AvField>
          </AvGroup>
        </AvForm>
      </CardBody>
    </Card>
  );
}

export default CartDeliveryForm;
