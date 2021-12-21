import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import BoardList from "./BoardList";
import PageNav from "./PageNav";
import { Button, Container } from "reactstrap";
import BoardAdd from "./BoardAdd";
function Board() {
  // state
  // 화면에 출력될 게시판 개수
  const displayCnt = 10;
  // 게시판 목록 총 개수
  const [boardTotal, setBoardTotal] = useState(0);
  //  현재 게시판 페이지 번호
  const [pageNum, setPageNum] = useState(0);
  // 게시판 글쓰기 버튼 클릭 여부
  const [isInputOpen, setIsInputOpen] = useState(false);
  // useEffect
  // 게시판 목록 총 개수
  useEffect(() => {
    getBoardTotalCount();
  }, []);
  //useMemo
  // 계산된 페이지 개수
  const pageNavNum = useMemo(() => {
    return Math.ceil(boardTotal / displayCnt);
  }, [boardTotal]);

  return (
    <Container className="mainContent">
      <h2>게시판</h2>
      {/* 현재 페이지 출력*/}
      <div style={{ display: "flex ", justifyContent: "flex-start" }}>{`${
        pageNum + 1
      }/${pageNavNum}`}</div>
      {/* controller -글쓰기 새로고침 */}
      <div className="boardController">
        <Button
          onClick={() => {
            setIsInputOpen((isOpen) => (isOpen = !isOpen));
          }}
        >
          글쓰기
        </Button>
        <Button onClick={getBoardTotalCount}>새로고침</Button>
      </div>
      {isInputOpen && <BoardAdd></BoardAdd>}
      {/*  BoardList*/}
      <BoardList displayCnt={displayCnt} pageNum={pageNum} />
      {/* pageNav */}
      <PageNav
        pageNum={pageNum}
        setPageNum={setPageNum}
        pageNavNum={pageNavNum}
      />
    </Container>
  );

  // 게시판 총 개수 조회 api-setBoardTotal
  function getBoardTotalCount() {
    axios
      .post("/api/board?type=count", {})
      .then((response) => {
        try {
          const cnt = response.data.json;
          if (cnt) {
            setBoardTotal(cnt[0].total_count);
          }
        } catch (error) {
          console.log(error);
          alert("게시판 개수를 가져오지 못했습니다");
        }
      })
      .catch((error) => {});
  }
}

export default Board;
