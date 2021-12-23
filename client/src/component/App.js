import { Route, useLocation } from "react-router-dom";
import Header from "../route/Header";
import Footer from "../route/Footer";
import "bootstrap/dist/css/bootstrap.css";
import "../css/index.css";

import Board from "../component/board/Board";
import Login from "../component/login/Login";
import Register from "../component/register/Register";
import Product from "../component/product/Product";
import Cart from "../component/cart/Cart";
import History from "../component/history/History";
import SearchProduct from "./search/SearchProduct";
import User from "./user/User";
import Home from "./Home/Home";
import { useEffect, useState } from "react";
import axios from "axios";
import cookie from "react-cookies";
function App() {
  const [userId, setUserId] = useState("");
  const location = useLocation();
  useEffect(() => {
    if ("/register" !== location.pathname) {
      sessionCheck();
    }
  }, [location.pathname]);

  const sessionCheck = async () => {
    const tid = cookie.load("token_id");
    const tname = cookie.load("token_name");
    const tpwd = cookie.load("user_pwd");
    if (tid && tname) {
      // 세션 유효한지 확인 - 60분 지나면 유효하지 않음
      axios
        .post("/api/user?type=sessionCheck", {
          token_id: tid,
          token_name: tname,
        })
        .then((res) => {
          // 유저 아이디 세팅
          setUserId(res.data.decrypt_id.user_email);
          // 쿠키의 비밀번호 검증
          if (tpwd) {
            axios
              .post("/api/user?type=sessionSignin", {
                user_email: res.data.decrypt_id.user_email,
                user_password: tpwd,
              })
              .then((res) => {
                if (!res.data[0].user_email) {
                  // 로그인 상태 해제처리
                  funcNotLogin();
                }
              })
              .catch(() => {});
          } else {
            // 로그인 상태 해제 처리
            funcNotLogin();
          }
        })
        .catch();
    } else {
      // 로그인 상태 해제 처리
      funcNotLogin();
    }
  };
  // 검증 실패 또는 토큰 정보 없을 경우 로그인 상태 해제 처리
  const funcNotLogin = () => {
    if (window.location.hash !== "nocookie") {
      funcRemoveCookie();
    }
    setTimeout(function () {
      window.location.href = "/login/#nocookie";
    }, 1000);
  };

  const funcRemoveCookie = () => {
    cookie.remove("token_id", { path: "/" });
    cookie.remove("token_name", { path: "/" });
    cookie.remove("user_pwd", { path: "/" });
  };
  return (
    <div className="App">
      <Header userId={userId} />
      <Route exact path="/" render={() => <Home />} />
      <Route
        exact
        path="/login"
        render={() => <Login setUserId={setUserId} />}
      />
      <Route exact path="/register" component={Register} />
      <Route exact path="/naverApi" component={SearchProduct} />
      <Route exact path="/board" component={Board} />
      <Route exact path="/user" render={() => <User userId={userId} />} />
      <Route path="/product" render={() => <Product userId={userId} />} />
      <Route path="/cart" render={() => <Cart userId={userId} />} />
      <Route path="/history" render={() => <History userId={userId} />} />
      <Footer />
    </div>
  );

  // function sessionCheck() {
  //   axios
  //     .post("/api/user?type=sessionCheck")
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch();
  // }
}

export default App;
