import { AvField, AvForm } from "availity-reactstrap-validation";
import React, { useEffect, useState } from "react";
import { Button, CardBody, CardHeader, Container } from "reactstrap";
import axios from "axios";
function Register() {
  const [userEmailPw, setUserEmailPw] = useState({
    user_name: "",
    user_email1: "",
    user_email2: "",
    user_password: "",
  });
  const [isValidData, setIsValidData] = useState(false);
  const [isValidForm, setIsValidForm] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  useEffect(() => {
    if (isValidForm) {
      // 이메일 중복검사
      dplicheck();
    }
  }, [isSubmit, isValidForm]);
  useEffect(() => {
    if (isValidData) {
      // 회원가입
      signUp();
    }
  }, [isValidData]);
  // 이메일 중복 검사 함수
  function dplicheck() {
    axios
      .post("api/user?type=dplicheck", {
        user_email1: userEmailPw.user_email1,
        user_email2: userEmailPw.user_email2,
      })
      .then((res) => {
        try {
          const data = res.data.json;
          if (data) {
            if (data[0].dupliEmailCount === 0) {
              setIsValidData(true);
            } else {
              alert("이미 회원가입된 이메일입니다");
              isValidForm(false);
            }
          }
        } catch {}
      })
      .catch();
  }
  //  회원가입 함수
  function signUp() {
    console.log(userEmailPw);
    axios
      .post("/api/user?type=signup", {
        ...userEmailPw,
        user_major: "",
        user_phone: "",
        user_org: "",
      })
      .then(() => {
        alert("회원가입 성공");
      })
      .catch(() => {
        alert("회원가입 중 오류가 발생하였습니다");
      });
  }
  return (
    <Container className="mainContent">
      <h2>회원가입</h2>
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
            회원가입
          </CardHeader>
          <CardBody>
            <AvForm
              id="signInForm"
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
              {/* 이름 입력 */}
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{ marginRight: "40px" }}>이름</div>
                <AvField
                  validate={{
                    required: { value: true },
                    maxLength: { value: 20 },
                  }}
                  name="userName"
                  type="text"
                  placeholder="20자 이하"
                  errorMessage="입력 필수"
                  onChange={(e) => {
                    setUserEmailPw({
                      ...userEmailPw,
                      user_name: e.target.value,
                    });
                  }}
                ></AvField>
              </div>
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
                    setUserEmailPw({
                      ...userEmailPw,
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
                    setUserEmailPw({
                      ...userEmailPw,
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
                    setUserEmailPw({
                      ...userEmailPw,
                      user_password: e.target.value,
                    });
                  }}
                ></AvField>
              </div>
              <Button className="w-100" form="signInForm" color="primary">
                회원가입
              </Button>
            </AvForm>
          </CardBody>
        </div>
      </div>
    </Container>
  );
}

export default Register;
