import React, { useMemo, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
function BoardAdd({ getBoardTotalCount, setIsInputOpen }) {
  //state
  const [insertUser, setInsertUser] = useState("");
  const [writePassword, setWritePassword] = useState("");
  // 게시판 제목
  const [boardTitle, setBoardTitle] = useState("");
  // 게시판 내용
  const [boardContent, setBoardContent] = useState("");
  // useMemo
  // 등록할 게시판 내용들
  // boardTitle,boardContent 변경시 갱신
  const boardData = useMemo(
    () => ({
      title: boardTitle,
      content: boardContent,
      id: "",
      insert_user: insertUser,
      view_count: 0,
      write_password: writePassword,
      insert_date: "",
    }),
    [boardTitle, boardContent, insertUser, writePassword]
  );
  return (
    <>
      <Form>
        {/* 작성자 입력 폼 */}
        <Label for="insertUser">작성자</Label>
        <Input
          id="insertUser"
          placeholder="작성자"
          type="text"
          onChange={(e) => {
            setInsertUser(e.target.value);
          }}
        ></Input>

        {/* 비밀번호 입력 폼 */}
        <Label for="writePassword">비밀번호</Label>
        <Input
          id="writePassword"
          placeholder="비밀번호"
          type="text"
          onChange={(e) => {
            setWritePassword(e.target.value);
          }}
        ></Input>
        {/* 제목 입력 폼 */}
        <Label for="boardTitle">제목</Label>
        <Input
          id="boardTitle"
          placeholder="50자 이하의 제목"
          type="text"
          maxLength="50"
          onChange={(e) => {
            setBoardTitle(e.target.value);
          }}
        ></Input>
        {/* 내용 입력 폼 */}
        <Label for="boardContent">내용</Label>
        <Input
          id="boardContent"
          placeholder="내용"
          type="textarea"
          onChange={(e) => {
            setBoardContent(e.target.value);
          }}
        ></Input>
      </Form>
      {/*  게시판 등록 버튼*/}
      <Button style={{ marginTop: "10px" }} onClick={addBoard}>
        게시판 등록
      </Button>
      <div>{}</div>
    </>
  );
  // api - 게시판 등록 addBoard
  function addBoard() {
    axios
      .post("/api/board?type=save", boardData)
      .then((response) => {
        try {
          alert("게시판 등록 성공");
          setIsInputOpen(false);
          getBoardTotalCount();
        } catch (error) {
          alert("작업 중 오류가 발생하였습니다.");
        }
      })
      .catch((error) => {});
  }
}

export default BoardAdd;
