import React, { useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

function CategoryDropdown({
  num,
  selectCategorys,
  setSelectCategorys,
  categoryList,
}) {
  const [isOpen, SetIsOpen] = useState(false);

  return (
    <Dropdown
      isOpen={isOpen}
      toggle={() => {
        SetIsOpen(!isOpen);
      }}
    >
      <DropdownToggle caret>카테고리 {num}</DropdownToggle>
      <DropdownMenu>
        {categoryList &&
          categoryList.map((data, index) => {
            return (
              <DropdownItem
                value={Object.values(data)}
                onClick={(e) => {
                  const newSelectCategorys = selectCategorys;
                  newSelectCategorys[Object.keys(selectCategorys)[num - 1]] =
                    e.target.value;
                  setSelectCategorys(newSelectCategorys);
                  SetIsOpen(false);
                }}
                key={index}
              >
                {Object.values(data)}
              </DropdownItem>
            );
          })}
      </DropdownMenu>
    </Dropdown>
  );
}

export default CategoryDropdown;
