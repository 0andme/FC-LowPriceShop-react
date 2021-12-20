import React, { useState } from "react";
import { Container } from "reactstrap";
import ItemList from "./ItemList";
import SearchBar from "./SearchBar";
function SearchProduct() {
  // state
  // 검색어 자동완성 목록 중 선택된 데이터
  const [selectedData, setSelectedData] = useState("");

  return (
    <Container className="mainContent ">
      <h2>최저가 상품 조회 및 등록 하기</h2>
      {/* 검색창 */}
      <SearchBar setSelectedData={setSelectedData} />
      {/* 검색된 상품 목록 리스트*/}
      {selectedData && <ItemList selectedData={selectedData} />}
    </Container>
  );
}

export default SearchProduct;
