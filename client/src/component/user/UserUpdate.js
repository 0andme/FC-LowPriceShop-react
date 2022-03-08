import { AvForm, AvField } from "availity-reactstrap-validation";
import axios from "axios";
import React, { useState } from "react";
import { Button, Card, Table } from "reactstrap";

function UserUpdate({ userData, setIsUpdateMode, getUserData, userId }) {
  const [userNewData, setUserNewData] = useState({
    user_email: userData.user_email,
    user_name: userData.user_name,
    user_org: userData.user_org,
    user_major: userData.user_major,
    user_phone: userData.user_phone,
  });

  return (
    <Card
      style={{
        maxWidth: "750px",
        margin: "0 auto",
      }}
    >
      <Table>
        <tbody>
          <tr>
            <td>이메일</td>
            <td>{userData.user_email ? userData.user_email : ""}</td>
          </tr>
          <tr>
            <td>이름</td>
            <td>
              <AvForm>
                <AvField
                  validate={{
                    required: { value: false },
                    maxLength: { value: 20 },
                  }}
                  name="user_name"
                  type="text"
                  value={userNewData.user_name}
                  placeholder="20자 이하"
                  errorMessage="입력 필수"
                  onChange={(e) => {
                    setUserNewData({
                      ...userNewData,
                      user_name: e.target.value,
                    });
                  }}
                ></AvField>
              </AvForm>
            </td>
          </tr>
          <tr>
            <td>직업</td>
            <td>
              <AvForm>
                <AvField
                  validate={{
                    required: { value: false },
                    maxLength: { value: 20 },
                  }}
                  name="user_org"
                  type="text"
                  value={userNewData.user_org}
                  placeholder="20자 이하"
                  onChange={(e) => {
                    setUserNewData({
                      ...userNewData,
                      user_org: e.target.value,
                    });
                  }}
                ></AvField>
              </AvForm>
            </td>
          </tr>
          <tr>
            <td>전공</td>
            <td>
              <AvForm>
                <AvField
                  validate={{
                    required: { value: false },
                    maxLength: { value: 100 },
                  }}
                  name="user_major"
                  type="text"
                  value={userNewData.user_major}
                  placeholder="100자 이하"
                  onChange={(e) => {
                    setUserNewData({
                      ...userNewData,
                      user_major: e.target.value,
                    });
                  }}
                ></AvField>
              </AvForm>
            </td>
          </tr>
          <tr>
            <td>번호</td>
            <td>
              <AvForm>
                <AvField
                  validate={{
                    required: { value: false },
                    pattern: {
                      value: "^[0-9]+$",
                      errorMessage: "숫자만 입력해주세요",
                    },
                    maxLength: { value: 11 },
                  }}
                  name="user_phone"
                  type="text"
                  value={userNewData.user_phone}
                  placeholder="-없이 입력해주세요"
                  onChange={(e) => {
                    setUserNewData({
                      ...userNewData,
                      user_phone: e.target.value,
                    });
                  }}
                ></AvField>
              </AvForm>
            </td>
          </tr>
        </tbody>
      </Table>
      <Button onClick={updateUserInfo} style={{ width: "100%" }}>
        수정
      </Button>
    </Card>
  );
  function updateUserInfo() {
    // console.log("aa", userNewData);
    axios
      .post("/api/user?type=updateUser", { ...userNewData, user_confirm: "Y" })
      .then(() => {
        alert("수정 완료");
        setIsUpdateMode(false);
        getUserData();
      })
      .catch(() => {
        alert("회원 정보를 수정하는 중 오류가 발생하였습니다");
      });
  }
}

export default UserUpdate;
