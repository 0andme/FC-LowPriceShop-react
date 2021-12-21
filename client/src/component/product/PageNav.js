import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

function PageNav({ pageNum, pageNavNum, setPageNum }) {
  // pageNavNum개의 PaginationItem 렌더를 위한 변수
  const pageNavList = () => {
    const navList = [];
    for (let index = 0; index < pageNavNum; index++) {
      navList.push(
        <PaginationItem active={index === pageNum} key={index}>
          <PaginationLink
            onClick={() => {
              setPageNum(index);
            }}
          >
            {index + 1}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return navList;
  };
  return (
    <div className="pageNav">
      <Pagination>
        <PaginationItem>
          <PaginationLink
            first
            onClick={() => {
              setPageNum(0);
            }}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            previous
            onClick={() => {
              setPageNum((num) => {
                if (num === 0) {
                  alert("첫 번째 페이지입니다");
                  return 0;
                } else return num - 1;
              });
            }}
          />
        </PaginationItem>
        {pageNavList()}
        <PaginationItem>
          <PaginationLink
            next
            onClick={() => {
              setPageNum((num) => {
                if (num === pageNavNum - 1) {
                  alert("마지막 페이지입니다");
                  return num;
                } else {
                  return (num = num + 1);
                }
              });
            }}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            last
            onClick={() => {
              setPageNum(pageNavNum - 1);
            }}
          />
        </PaginationItem>
      </Pagination>
    </div>
  );
}

export default PageNav;
