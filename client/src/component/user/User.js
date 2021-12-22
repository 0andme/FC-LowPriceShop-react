import React, { useEffect, useState } from "react";
import { Button, Container } from "reactstrap";
import UserInfo from "./UserInfo";
import UserUpdate from "./UserUpdate";
import axios from "axios";

function User({ userId }) {
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Container className="mainContent">
      <h2>마이 페이지</h2>
      {/* 회원 정보 수정 버튼 */}
      <Button
        style={{ marginBottom: "30px" }}
        onClick={() => {
          setIsUpdateMode(!isUpdateMode);
        }}
      >
        {isUpdateMode ? "취소" : "회원 정보 수정"}
      </Button>
      {/* 수정 폼 출력 */}
      {isUpdateMode && (
        <UserUpdate
          getUserData={getUserData}
          userData={userData}
          setIsUpdateMode={setIsUpdateMode}
          userId={userId}
        ></UserUpdate>
      )}
      {/* 기본정보 출력 */}

      {!isUpdateMode && (
        <UserInfo userData={userData} userId={userId}></UserInfo>
      )}
    </Container>
  );
  function getUserData() {
    axios
      .post("/api/user?type=selectUser", { user_email: userId })
      .then((res) => {
        try {
          const data = res.data.json;
          if (data) {
            setUserData(data[0]);
          }
        } catch {}
      })
      .catch();
  }
}

export default User;
