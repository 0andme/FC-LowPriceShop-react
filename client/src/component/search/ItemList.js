import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import ItemListItem from "./ItemListItem";
import { Table } from "reactstrap";
import PageNav from "./PageNav";

function ItemList({ selectedData }) {
  // state
  const displayCnt = 10;
  const pageNavNum = 10;
  // 네이버 상품 검색 결과 리스트
  const [itemList, setItemList] = useState([]);
  // 네이버 상품 검색 api에 사용되는 페이지 번호
  const [pageNum, setPageNum] = useState(0);
  // 네이버 상품 검색 api body값 지정

  const searchOptions = useMemo(() => {
    console.log("pageNum", pageNum);
    return {
      query: selectedData,
      display: displayCnt,
      start: pageNum * displayCnt,
      sort: "asc",
    };
  }, [selectedData, pageNum]);

  // 상품 검색 api 호출
  useEffect(() => {
    axios
      .post("/api/naverApi?type=shopList", searchOptions)
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
      <PageNav pageNavNum={pageNavNum} setPageNum={setPageNum}></PageNav>
    </>
  );
}

export default ItemList;
