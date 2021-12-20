import React, { useMemo, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
function BoardAdd() {
  //state
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
      insert_user: "작성자Y",
      view_count: 0,
      write_password: 1234,
      insert_date: "",
    }),
    [boardTitle, boardContent]
  );
  return (
    <>
      <Form>
        {/* 제목 입력 폼 */}
        <FormGroup>
          <Label for="boardTitle">제목</Label>
          <Input
            id="boardTitle"
            placeholder="제목"
            type="text"
            onChange={(e) => {
              setBoardTitle(e.target.value);
            }}
          ></Input>
        </FormGroup>
        {/* 내용 입력 폼 */}
        <FormGroup>
          <Label for="boardContent">내용</Label>
          <Input
            id="boardContent"
            placeholder="내용"
            type="textarea"
            onChange={(e) => {
              setBoardContent(e.target.value);
            }}
          ></Input>
        </FormGroup>
      </Form>
      {/*  게시판 등록 버튼*/}
      <Button onClick={addBoard}>게시판 등록</Button>
      <div>{}</div>
    </>
  );
  // api - 게시판 등록 addBoard
  function addBoard() {
    console.log(boardData);
    axios
      .post("/api/board?type=save", boardData)
      .then((response) => {
        try {
          console.log(response);
        } catch (error) {
          console.log(error);
          alert("작업 중 오류가 발생하였습니다.");
        }
      })
      .catch((error) => {});
  }
}

export default BoardAdd;
