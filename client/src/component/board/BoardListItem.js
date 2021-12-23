import axios from "axios";
import React, { useState } from "react";
import { Card, CardHeader, CardText, CardTitle } from "reactstrap";

function BoardListItem({ item, getBoardList }) {
  // state
  // 개별 게시판 목록 아이템의 클릭 여부
  const [isItemOpen, setIsItemOpen] = useState(false);
  return (
    <>
      <tr
        onClick={() => {
          if (isItemOpen) {
            upViewCount();
          }
          setIsItemOpen(!isItemOpen);
        }}
      >
        <td>{item.id}</td>
        <td>{item.title}</td>
        <td>{item.insert_user}</td>
        <td>{item.insert_date}</td>
      </tr>
      {/* 상세페이지 */}
      {isItemOpen && (
        <tr>
          <td colSpan="4">
            <Card body>
              <CardHeader> {item.title ? item.title : "제목없음"}</CardHeader>
              <span style={{ position: "absolute", margin: "10px 0  0 10px" }}>
                조회수 {item.view_count}
              </span>
              <span style={{ position: "absolute", margin: "10px 0 0 100px" }}>
                작성자 {item.insert_user}
              </span>
              <CardText>{item.content ? item.content : "내용없음"}</CardText>
            </Card>
          </td>
        </tr>
      )}
    </>
  );
  function upViewCount() {
    axios
      .post("/api/Board?type=upCount", { id: item.id })
      .then(() => {
        getBoardList();
      })
      .catch();
  }
}

export default BoardListItem;
