import React, { useEffect, useState } from "react";
import axios from "axios";
import BoardListItem from "./BoardListItem";
import { Table } from "reactstrap";
function BoardList({ pageNum, displayCnt }) {
  // state
  // 화면에 출력될 게시판 목록
  const [boardList, setBoardList] = useState([]);
  //useEffect
  // pageNum변경시 게시판 목록 가져오기
  useEffect(() => {
    getBoardList();
  }, [pageNum]);

  return (
    <div className="boardList">
      <Table size="sm" hover>
        <thead>
          <tr>
            <th className={"w-15"}>순 번</th>
            <th className={"w-40"}>제 목</th>
            <th className={"w-15"}>입력자</th>
            <th className={"w-15"}>입력일</th>
          </tr>
        </thead>
        {/* 하위 컴포넌트 BoardListItem  */}
        {boardList.length > 0 && (
          <tbody>
            {boardList.map((item) => {
              return <BoardListItem item={item} key={item.id} />;
            })}
          </tbody>
        )}
      </Table>
      {/* boardList가 빈 배열일때 */}
      {boardList.length === 0 && <div className="emptyBoard">없음</div>}
    </div>
  );
  // api-page로 게시판 목록 가져오기
  function getBoardList() {
    axios
      .post("/api/board?type=page", {
        length: displayCnt,
        start: displayCnt * pageNum,
      })
      .then((response) => {
        try {
          const list = response.data.json;

          if (list) {
            setBoardList(list);
          }
        } catch (error) {
          console.log(error);
          alert("작업 중 오류가 발생하였습니다.");
        }
      })
      .catch((error) => {});
  }
}

export default BoardList;
