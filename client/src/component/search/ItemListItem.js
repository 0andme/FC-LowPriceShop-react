import { Button } from "reactstrap";
import axios from "axios";
function ItemListItem({ item }) {
  return (
    <tr className="itemList__item" style={{ textAlign: "center" }}>
      <td>
        <img src={item.image} alt={item.title} />
      </td>
      <td>
        <a href={item.link}>{item.title.replace(/([<b>]|[</b>])/g, "")}</a>
      </td>
      <td>
        <span>{item.lprice}</span>
      </td>

      <td>
        <span>{item.maker}</span>
      </td>
      <td>
        <Button onClick={funSaveItem}>등록</Button>
      </td>
    </tr>
  );
  function funSaveItem() {
    axios
      .post("/api/naverApi?type=save", {
        brand: item.brand,
        category1: item.category1,
        category2: item.category2,
        category3: item.category3,
        category4: item.category4,
        h_price: item.hprice,
        image: item.image,
        l_price: item.lprice,
        link: item.link,
        maker: item.maker,
        mall_name: item.mallName,
        product_count: 1,
        product_id: item.productId,
        product_type: item.productType,
        title: item.title,
      })
      .then((res) => {
        alert("등록 완료!");
      })
      .catch((error) => {
        alert("등록 중 오류가 발생했습니다.", error, "error", "닫기");
      });
  }
}
export default ItemListItem;
