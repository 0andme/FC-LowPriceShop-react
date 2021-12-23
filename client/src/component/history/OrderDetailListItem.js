import React from "react";
function OrderDetailListItem({ item, index }) {
  return (
    <tr>
      <td>{index}</td>
      <td>
        <img
          src={
            item.image
              ? item.image
              : "https://www.i-shop.link/home/assets/images/no-image.png"
          }
          alt={item.title}
        />
      </td>
      <td>
        {item.title
          ? item.title.replace(/([<b>]|[</b>])/g, "")
          : "현재 미등록 상품입니다"}
      </td>
      <td>{item.amount}</td>
      <td>
        <span>{item.l_price * item.amount}</span>
      </td>
    </tr>
  );
}

export default OrderDetailListItem;
