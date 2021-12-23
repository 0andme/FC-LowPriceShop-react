import axios from "axios";
import { Button } from "reactstrap";

function SaveProductListItem({
  item,
  index,
  getSaveProductTotal,
  getsaveProductList,
  userId,
}) {
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
        <Button onClick={cartSave}>담기</Button>
      </td>
    </tr>
  );
  // api - 등록된 상품 삭제
  function deleteSaveItem() {
    axios
      .post("/api/product?type=delete", { product_id: item.product_id })
      .then((res) => {
        try {
          alert("상품 삭제 완료");
          getsaveProductList();
          getSaveProductTotal();
        } catch {
          alert("상품 삭제 중 오류가 발생하였습니다.");
        }
      })
      .catch(() => {});
  }
  //api -  cart에 넣기
  function cartSave() {
    // cart id가져오기
    axios
      .post("/api/cart?type=cart_id", { user_id: userId })
      .then((res) => {
        try {
          const data = res.data.json;
          if (data) {
            const cartId = data[0].cart_id;
            // api - 장바구니에 넣기
            axios
              .post("/api/cart?type=save", {
                cart_id: cartId,
                product_id: item.product_id,
                user_id: userId,
              })
              .then(() => {
                alert("장바구니 담기 성공");
              })
              .catch(() => {
                alert("장바구니 담기 중 오류가 발생하였습니다");
              });
          }
        } catch {}
      })
      .catch((err) => {
        alert("Cart Id 조회 중 오류가 발생하였습니다.");
      });
  }
}

export default SaveProductListItem;
