import React from "react";
import { ListGroupItem } from "reactstrap";

function SearchItem({ searchedItem, setSelectedData, setIsSelectItem }) {
  return (
    <ListGroupItem className="searchedItem" onClick={seleced}>
      {searchedItem.toString()}
    </ListGroupItem>
  );

  function seleced() {
    setSelectedData(searchedItem.toString());
    setIsSelectItem(true);
  }
}
export default SearchItem;
