import React, { useEffect, useMemo, useState } from "react";
import { Button, CardBody, CardHeader, Container } from "reactstrap";
import { AvField, AvForm } from "availity-reactstrap-validation";
import axios from "axios";
import cookie from "react-cookies";
function Login({ setUserId }) {
  const [loginData, setLoginData] = useState({
    user_email1: "",
    user_email2: "",
    user_password: "",
  });
  const [isValidForm, setIsValidForm] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const userId = useMemo(() => {
    return loginData.user_email1 + "@" + loginData.user_email2;
  }, [loginData]);
  useEffect(() => {
    if (isValidForm) {
      // 로그인 시도
      funcLogin();
    }
  }, [isSubmit, isValidForm]);

  const user_email = useMemo(() => {
    return loginData.user_email1 + "@" + loginData.user_email2;
  }, [loginData.user_email1, loginData.user_email2]);

  // 로그인 함수
  function funcLogin() {
    axios
      .post("/api/user?type=login", {
        user_email: user_email,
        user_password: loginData.user_password,
      })
      .then((res) => {
        try {
          const data = res.data[0];
          const user_email = data.user_email;
          const user_name = data.user_name;
          const user_pwd = data.user_password;
          alert("로그인 성공");
          // 로그인 후에 세션 유효기간 60분으로 설정하기
          const expires = new Date();
          expires.setMinutes(expires.getMinutes() + 60);
          // 쿠키에 로그인 데이터 넣기
          funcJwtToken(expires, user_pwd, user_email, user_name);
        } catch {
          alert("이메일과 비밀번호를 확인해주세요");
        }
      })
      .catch(() => {});
  }
  // 쿠키에 로그인 데이터 넣기
  function funcJwtToken(expires, user_pwd, user_email, user_name) {
    axios
      .post("/api/user?type=webtoken", {
        user_email: user_email,
        user_name: user_name,
      })
      .then((res) => {
        cookie.save("token_id", res.data.token_id, {
          path: "/",
          expires,
        });
        cookie.save("token_name", res.data.token_name, {
          path: "/",
          expires,
        });
        cookie.save("user_pwd", user_pwd, { path: "/naverApi", expires });
      })
      .catch(() => {
        alert("작업 중 오류가 발생했습니다");
      });
    setTimeout(function () {
      window.location.href = "/naverApi";
    }, 1000);
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
