import React, { useEffect, useMemo, useState } from "react";
import { Button, Container } from "reactstrap";
import axios from "axios";
import SaveProductList from "./SaveProductList";
import SearchSaveProduct from "./SearchSaveProduct";
import SearchProductList from "./SearchProductList";
import PageNav from "../search/PageNav";

function Product({ userId }) {
  // state
  // 등록된 상품 총 개수
  const [saveProductTotal, setSaveProductTotal] = useState(0);
  // 카테고리별/페이지별 출력 선택 여부
  const [isPageOrSearch, setIsPageOrSearch] = useState(false);
  // 검색 버튼 클릭 여부
  const [searchClick, setSearchClick] = useState(false);
  // 선택된 카테고리 객체
  const [selectCategorys, setSelectCategorys] = useState({
    category1: "",
    category2: "",
    category3: "",
    category4: "",
  });
  // 출력될 검색 결과의 최대개수
  const displayCnt = 10;
  // 현재 페이지 번호
  const [pageNum, setPageNum] = useState(0);
  // 계산된 총 페이지 개수
  const pageNavNum = useMemo(() => {
    return Math.ceil(saveProductTotal / displayCnt);
  }, [saveProductTotal]);
  // useEffect
  // 등록된 상품 총 개수 update
  useEffect(() => {
    getSaveProductTotal();
  }, []);
  return (
    <Container className="mainContent">
      <h2>상품 목록</h2>
      {/* 총 등록된 상품 개수 출력 */}
      <span className="saveProductNum">총 {saveProductTotal}개</span>
      {/* 페이지별/카테고리별 토글 버튼*/}
      <Button
        className="isPageOrSearchBtn"
        onClick={() => {
          setIsPageOrSearch(!isPageOrSearch);
        }}
      >
        {isPageOrSearch ? "카테고리 별" : "페이지 별"}
      </Button>
      {/* 버튼이 카테고리별일 때 */}
      {isPageOrSearch && (
        <>
          {/* 카테고리 선택 컴포넌트  */}
          <SearchSaveProduct
            searchClick={searchClick}
            setSearchClick={setSearchClick}
            selectCategorys={selectCategorys}
            setSelectCategorys={setSelectCategorys}
          />
          {/* 카테고리별 아이템 리스트 */}
          <SearchProductList
            searchClick={searchClick}
            selectCategorys={selectCategorys}
            userId={userId}
          />
        </>
      )}
      {/* 버튼이 페이지별일 때 */}
      {!isPageOrSearch && (
        <>
          {/* 현재 페이지 번호 출력 */}
          <div style={{ display: "flex ", justifyContent: "flex-start" }}>{`${
            pageNum + 1
          }/${pageNavNum}`}</div>

          {/* 등록된 상품 리스트 */}
          <SaveProductList
            userId={userId}
            getSaveProductTotal={getSaveProductTotal}
            displayCnt={displayCnt}
            pageNum={pageNum}
          />
          {/* 페이지 네비게이션 */}
          <PageNav
            pageNum={pageNum}
            pageNavNum={pageNavNum}
            setPageNum={setPageNum}
          ></PageNav>
        </>
      )}
    </Container>
  );
  // api- 등록된 product 개수 가져오기
  function getSaveProductTotal() {
    axios
      .post("/api/product?type=count")
      .then((response) => {
        try {
          const cnt = response.data.json;
          if (cnt) {
            setSaveProductTotal(cnt[0].total_count);
          }
        } catch (error) {
          console.log(error);
          alert("작업 중 오류가 발생하였습니다.");
        }
      })
      .catch((error) => {});
  }
}

export default Product;
