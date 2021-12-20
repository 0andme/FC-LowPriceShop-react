import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import axios from "axios";
import SaveProductListItem from "./SaveProductListItem";
function SaveProductList({ getSaveProductTotal, displayCnt, pageNum, userId }) {
  // state
  // 화면에 출력될 상품목록 목록
  const [saveProductList, setSaveProductList] = useState([]);
  // useEffect
  // 화면에 출력될 상품목록 목록 가져오기
  // pageNum 변경시
  useEffect(() => {
    getsaveProductList();
  }, [pageNum]);

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
        {saveProductList.length > 0 && (
          <tbody>
            {saveProductList.map((item, index) => {
              return (
                <SaveProductListItem
                  index={index + 1}
                  getSaveProductTotal={getSaveProductTotal}
                  getsaveProductList={getsaveProductList}
                  item={item}
                  key={item.product_id}
                />
              );
            })}
          </tbody>
        )}
      </Table>
      {saveProductList.length === 0 && <div className="emptyBoard">없음</div>}
    </div>
  );
  // api-등록한 상품 목록 가져오기 - 페이지
  function getsaveProductList() {
    axios
      .post("/api/product?type=page", {
        length: displayCnt,
        start: displayCnt * pageNum,
        user_id: userId,
      })
      .then((response) => {
        try {
          const list = response.data.json;
          if (list) {
            setSaveProductList(list);
          }
        } catch (error) {
          alert("작업 중 오류가 발생하였습니다.");
        }
      })
      .catch((error) => {});
  }
}

export default SaveProductList;
