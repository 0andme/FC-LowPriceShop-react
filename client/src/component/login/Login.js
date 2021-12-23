import React, { useEffect, useMemo, useState } from "react";
import { Button, CardBody, CardHeader, Container } from "reactstrap";
import { AvField, AvForm } from "availity-reactstrap-validation";
import axios from "axios";

function Login({ setUserId }) {
  const [loginData, setLoginData] = useState({
    user_email1: "",
    user_email2: "",
    user_password: "",
  });
  const [isValidData, setIsValidData] = useState(false);
  const [isValidForm, setIsValidForm] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const userId = useMemo(() => {
    return loginData.user_email1 + "@" + loginData.user_email2;
  }, [loginData]);
  useEffect(() => {
    if (isValidForm) {
      // 비밀번호 검사
      dplicheck();
    }
  }, [isSubmit, isValidForm]);
  useEffect(() => {
    if (isValidData) {
      alert("로그인 성공");
      setUserId(userId);
    }
  }, [isValidData]);
  const user_email = useMemo(() => {
    return loginData.user_email1 + "@" + loginData.user_email2;
  }, [loginData.user_email1, loginData.user_email2]);
  function dplicheck() {
    axios
      .post("api/user?type=dplicheck", {
        user_email1: loginData.user_email1,
        user_email2: loginData.user_email2,
      })
      .then((res) => {
        try {
          const data = res.data.json;
          if (data) {
            if (data[0].dupliEmailCount === 0) {
              alert("가입된 이메일이 없습니다");
              setIsValidData(false);
              setIsValidForm(false);
            } else {
              passwordCheck();
            }
          }
        } catch {}
      })
      .catch();
  }
  function passwordCheck() {
    axios
      .post("/api/user?type=pwdCheck", {
        user_email: user_email,
        user_password: loginData.user_password,
      })
      .then((res) => {
        try {
          const data = res.data;
          if (data) {
            if (data.value === "Y") {
              setIsValidData(true);
            } else {
              alert("비밀번호를 다시 확인해주세요");
              setIsValidData(false);
              setIsValidForm(false);
            }
          }
        } catch {
          alert("등록되지 않은 이메일 입니다");
        }
      })
      .catch();
  }
  return (
    <Container className="mainContent">
      <h2>로그인</h2>
      <div style={{ width: "auto", margin: "100px auto 0" }}>
        <div
          style={{
            maxWidth: "750px",
            border: "1px solid rgba(0,0,0,0.05)",
            borderRadius: "4px",

            margin: "0 auto",
          }}
        >
          <CardHeader tag="h5" style={{ margin: 0 }}>
            로그인
          </CardHeader>
          <CardBody>
            <AvForm
              id="logInForm"
              onSubmit={() => {
                setIsSubmit(!isSubmit);
              }}
              onValidSubmit={() => {
                setIsValidForm(true);
              }}
              onInvalidSubmit={() => {
                setIsValidForm(false);
              }}
            >
              {/* 이메일 입력 */}
              <div
                style={{
                  display: "flex",
                  flexGrow: "1",
                  justifyContent: "flex-start",
                }}
              >
                {/* 이메일 1 */}
                <div style={{ marginRight: "30px" }}>이메일</div>
                <AvField
                  validate={{
                    required: { value: true },
                    pattern: {
                      value: "^[a-z0-9A-Z._-]+$",
                      errorMessage: "영어 대소문자 . _ -만 허용됩니다",
                    },
                    maxLength: { value: 30 },
                  }}
                  name="userEmail1"
                  type="text"
                  placeholder="30자 이하"
                  errorMessage="입력 필수"
                  onChange={(e) => {
                    setLoginData({
                      ...loginData,
                      user_email1: e.target.value,
                    });
                  }}
                ></AvField>
                <div style={{ margin: "0 10px" }}>@</div>
                {/* 이메일 2 */}
                <AvField
                  required
                  name="userEmail2"
                  type="select"
                  errorMessage="이메일 형식을 골라주세요"
                  onChange={(e) => {
                    setLoginData({
                      ...loginData,
                      user_email2: e.target.value,
                    });
                  }}
                >
                  <option value hidden>
                    이메일 형식을 고르세요
                  </option>
                  <option>naver.com</option>
                  <option>daum.net</option>
                  <option>gmail.com</option>
                  <option>outlook.com</option>
                </AvField>
              </div>
              {/* 비밀번호 */}
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{ marginRight: "20px" }}>비밀번호</div>
                <AvField
                  validate={{
                    required: { value: true },
                    maxLength: { value: 30, errorMessage: "ss" },
                  }}
                  name="userPassword"
                  type="text"
                  placeholder="30자 이하"
                  errorMessage="입력 필수"
                  onChange={(e) => {
                    setLoginData({
                      ...loginData,
                      user_password: e.target.value,
                    });
                  }}
                ></AvField>
              </div>
              <Button className="w-100" form="logInForm" color="primary">
                로그인
              </Button>
            </AvForm>
          </CardBody>
        </div>
      </div>
    </Container>
  );
}

export default Login;
