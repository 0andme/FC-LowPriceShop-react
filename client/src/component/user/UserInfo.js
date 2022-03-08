import React from "react";
import { Card, Table } from "reactstrap";

function UserInfo({ userData, userId }) {
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
            <td>{userData ? userData.user_email : ""}</td>
          </tr>
          <tr>
            <td>이름</td>
            <td>{userData ? userData.user_name : ""}</td>
          </tr>
          <tr>
            <td>직업</td>
            <td>{userData ? userData.user_org : "없음"}</td>
          </tr>
          <tr>
            <td>전공</td>
            <td>{userData ? userData.user_major : "없음"}</td>
          </tr>
          <tr>
            <td>번호</td>
            <td>
              {userData
                ? userData.user_phone?.replace(
                    /(\d{3})(\d{4})(\d{4})/,
                    "$1-$2-$3"
                  )
                : "없음"}
            </td>
          </tr>
        </tbody>
      </Table>
    </Card>
  );
}

export default UserInfo;
