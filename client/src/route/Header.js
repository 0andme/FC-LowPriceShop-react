import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Nav, Navbar, NavbarBrand, NavItem } from "reactstrap";

class Header extends Component {
  render() {
    const userId = this.props.userId;
    return (
      <header>
        <Navbar>
          <NavbarBrand>
            <Link to={"/"}>
              <img
                src={require("../img/layout/logo.png").default}
                height="90px"
                width="200px"
                alt=""
              />
            </Link>
          </NavbarBrand>
          {/* <NavbarToggler /> */}
          <Nav className="mr-auto" className="menu">
            {!userId && (
              <NavItem>
                <NavLink to={"/login"}>로그인</NavLink>
              </NavItem>
            )}
            {!userId && (
              <NavItem>
                <NavLink to={"/register"}>회원가입</NavLink>
              </NavItem>
            )}
            <NavItem>
              <NavLink to={"/board"}>게시판</NavLink>
            </NavItem>

            {userId && (
              <NavItem>
                <NavLink to={"/user"}>마이페이지</NavLink>
              </NavItem>
            )}
            {userId && (
              <NavItem>
                <NavLink to={"/naverApi"}>상품등록</NavLink>
              </NavItem>
            )}
            {userId && (
              <NavItem>
                <NavLink to={"/product"}>상품목록</NavLink>
              </NavItem>
            )}
            {userId && (
              <NavItem>
                <NavLink to={"/cart"}>장바구니</NavLink>
              </NavItem>
            )}
            {userId && (
              <NavItem>
                <NavLink to={"/history"}>주문 내역</NavLink>
              </NavItem>
            )}
          </Nav>
        </Navbar>
      </header>
    );
  }
}

export default Header;
