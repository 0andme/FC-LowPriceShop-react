import React, { useState } from "react";
import { Card } from "reactstrap";

function BoardListItem({ item }) {
  // state
  // 개별 게시판 목록 아이템의 클릭 여부
  const [isItemOpen, setIsItemOpen] = useState(false);
  return (
    <>
      <tr
        onClick={() => {
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
            <Card>
              <h5>{item.title}</h5>
              <div>{item.content}</div>
            </Card>
          </td>
        </tr>
      )}
    </>
  );
}

export default BoardListItem;
