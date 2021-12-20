import axios from "axios";
import { Button } from "reactstrap";

function SearchProductListItem({ item, index, getSearchSaveProductList }) {
  return (
    <tr className="itemList__item">
      <td>{index}</td>
      <td>
        <img src={item.image} alt={item.title} />
      </td>
      <td>
        <a href={item.link}>{item.title.replace(/([<b>]|[</b>])/g, "")}</a>
      </td>
      <td>
        <span>{item.l_price}</span>
      </td>
      <td>
        <span>{item.product_count}</span>
      </td>
      <td>
        <Button onClick={deleteSaveItem}>삭제</Button>
      </td>
      <td>
        <Button>담기</Button>
      </td>
    </tr>
  );
  // api - 등록된 상품 목록에서 아이템 삭제
  function deleteSaveItem() {
    axios
      .post("/api/product?type=delete", { product_id: item.product_id })
      .then((res) => {
        try {
          alert("상품 삭제 완료");
          getSearchSaveProductList();
        } catch {
          alert("상품 삭제 중 오류가 발생하였습니다.");
        }
      })
      .catch(() => {});
  }
}

export default SearchProductListItem;
