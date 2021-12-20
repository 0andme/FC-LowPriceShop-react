import React from "react";

function CartListItem({ item, index }) {
  return (
    <tr>
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
        <span>{item.amount}</span>
      </td>
      <td>{item.price}</td>
    </tr>
  );
}

export default CartListItem;
