import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import axios from "axios";
import SearchProductListItem from "./SearchProductListItem";
function SearchProductList({ searchClick, selectCategorys, userId }) {
  // state
  // 화면에 출력될 상품 목록
  const [searchSaveProductList, setSearchSaveProductList] = useState([]);
  // useEffect
  // 검색 버튼이 눌릴 때마다 실행
  useEffect(() => {
    getSearchSaveProductList();
  }, [searchClick]);

  return (
    <div>
      <Table size="sm" hover>
        <thead>
          <tr>
            <th>번호</th>
            <th className="w-20">상품</th>
            <th className="w-50">상품명</th>
            <th>가격</th>
            <th>수량</th>
            <th>상품 삭제</th>
            <th>장바구니 담기</th>
          </tr>
        </thead>
        {searchSaveProductList.length > 0 && (
          <tbody>
            {searchSaveProductList.map((item, index) => {
              return (
                <SearchProductListItem
                  userId={userId}
                  index={index + 1}
                  item={item}
                  key={item.product_id}
                />
              );
            })}
          </tbody>
        )}
      </Table>
    </div>
  );
  // api-등록한 상품 목록 가져오기 - 카테고리로 검색
  function getSearchSaveProductList() {
    axios
      .post("/api/product?type=list", {
        user_id: userId,
        category1: selectCategorys.category1,
        category2: selectCategorys.category2,
        category3: selectCategorys.category3,
        category4: selectCategorys.category4,
        title: "",
      })
      .then((response) => {
        try {
          const list = response.data.json;
          if (list) {
            setSearchSaveProductList(list);
          }
        } catch (error) {
          alert(" 카테고리 검색 중 오류가 발생하였습니다.");
        }
      })
      .catch((error) => {});
  }
}

export default SearchProductList;
