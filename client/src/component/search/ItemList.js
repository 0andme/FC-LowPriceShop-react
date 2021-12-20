import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import ItemListItem from "./ItemListItem";
import { Table } from "reactstrap";

function ItemList({ selectedData }) {
  // state
  // 네이버 상품 검색 결과 리스트
  const [itemList, setItemList] = useState([]);
  // 네이버 상품 검색 api에 사용되는 페이지 번호
  const [pageNum, setPageNum] = useState(1);
  // 네이버 상품 검색 api body값 지정
  const searchOptions = useMemo(() => {
    return {
      query: selectedData,
      display: 10,
      start: pageNum,
      sort: "asc",
    };
  }, [selectedData, pageNum]);
  // pagination 렌더
  // const pagelist = () => {
  //   const res = [];
  //   for (let index = 0; index < 10; index++) {
  //     res.push(
  //       <PaginationItem key={index}>
  //         <PaginationLink
  //           id={searchOptions.display * index + 1}
  //           onClick={() => {
  //             setPageNum(index + 1);
  //           }}
  //         >
  //           {index + 1}
  //         </PaginationLink>
  //       </PaginationItem>
  //     );
  //   }
  //   return res;
  // };

  // 상품 검색 api 호출
  useEffect(() => {
    axios
      .post("/api/naverApi?type=shopList", {
        query: selectedData,
      })
      .then((res) => {
        setItemList(res.data.items);
      })
      .catch((err) => {
        alert("상품 조회 실패");
        console.log("err", err);
      });
  }, [searchOptions]);
  return (
    <>
      <Table striped>
        <thead>
          <tr>
            <th>검색결과</th>
            <th className="w-50">상품명</th>
            <th className="w-30">최저가</th>
            <th>브랜드</th>
            <th>상품 등록</th>
          </tr>
        </thead>
        {itemList.length > 0 && (
          <tbody className="itemList">
            {itemList.map((item, index) => (
              <ItemListItem item={item} key={item.productId} />
            ))}
          </tbody>
        )}
      </Table>
      {/* <div className="itemList__pagination">
        <Pagination>{pagelist()}</Pagination>
      </div> */}
    </>
  );
}

export default ItemList;
