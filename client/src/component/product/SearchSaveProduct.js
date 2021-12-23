import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

function SearchSaveProduct({
  searchClick,
  setSearchClick,
  selectCategorys,
  setSelectCategorys,
}) {
  // state
  // 카테고리 버튼들의 클릭여부저장
  const [isOpen, SetIsOpen] = useState({
    category1: false,
    category2: false,
    category3: false,
    category4: false,
  });
  //api로 가져온 카테고리 리스트들
  const [categoryList, setCategoryList] = useState({
    category1: [],
    category2: [],
    category3: [],
    category4: [],
  });
  //카테고리 1번 가져오기
  useEffect(() => {
    getCategoryList({ num: 1 });
  }, []);
  // 카테고리 2번 가져오기 1번 카테고리 값이 변경되었을 때만
  useEffect(() => {
    getCategoryList({ num: 2, category1: selectCategorys.category1 });
  }, [selectCategorys.category1]);

  // 카테고리 3번 가져오기 2번 카테고리 값이 변경되었을 때만
  useEffect(() => {
    getCategoryList({
      num: 3,
      category1: selectCategorys.category1,
      category2: selectCategorys.category2,
    });
  }, [selectCategorys.category2]);

  // 카테고리 4번 가져오기 3번 카테고리 값이 변경되었을 때만
  useEffect(() => {
    getCategoryList({
      num: 4,
      category1: selectCategorys.category1,
      category2: selectCategorys.category2,
      category3: selectCategorys.category3,
    });
  }, [selectCategorys.category3]);

  return (
    <div className="d-flex justify-content-center">
      {/* 카테고리 1번 */}
      <Dropdown
        isOpen={isOpen.category1}
        toggle={() => {
          SetIsOpen({ ...isOpen, category1: !isOpen.category1 });
        }}
      >
        <DropdownToggle color="light" caret>
          {selectCategorys.category1 ? selectCategorys.category1 : "카테고리 1"}
        </DropdownToggle>{" "}
        <DropdownMenu>
          <DropdownItem header>카테고리 1</DropdownItem>
          {categoryList.category1.length > 0 &&
            categoryList.category1.map((data, index) => {
              return (
                <DropdownItem
                  value={data.category1}
                  onClick={(e) => {
                    setSelectCategorys(() => ({
                      ...selectCategorys,
                      category1: e.target.value,
                      category2: "",
                      category3: "",
                      category4: "",
                    }));

                    SetIsOpen(() => {
                      return { ...isOpen, category1: false };
                    });
                  }}
                  key={index}
                >
                  {data.category1}
                </DropdownItem>
              );
            })}
        </DropdownMenu>
      </Dropdown>
      {/* 카테고리 2번 */}
      <Dropdown
        isOpen={isOpen.category2}
        toggle={() => {
          SetIsOpen({ ...isOpen, category2: !isOpen.category2 });
        }}
      >
        <DropdownToggle color="light" caret>
          {selectCategorys.category2 ? selectCategorys.category2 : "카테고리 2"}
        </DropdownToggle>{" "}
        <DropdownMenu>
          <DropdownItem header>카테고리 2</DropdownItem>

          {categoryList.category2.length > 0 &&
            categoryList.category2.map((data, index) => {
              return (
                <DropdownItem
                  value={data.category2}
                  onClick={(e) => {
                    setSelectCategorys(() => ({
                      ...selectCategorys,
                      category2: e.target.value,
                      category3: "",
                      category4: "",
                    }));
                    SetIsOpen(() => {
                      return { ...isOpen, category2: false };
                    });
                  }}
                  key={index}
                >
                  {data.category2}
                </DropdownItem>
              );
            })}
        </DropdownMenu>
      </Dropdown>
      {/* 카테고리 3번 */}
      <Dropdown
        isOpen={isOpen.category3}
        toggle={() => {
          SetIsOpen({ ...isOpen, category3: !isOpen.category3 });
        }}
      >
        <DropdownToggle color="light" caret>
          {selectCategorys.category3 ? selectCategorys.category3 : "카테고리 3"}
        </DropdownToggle>{" "}
        <DropdownMenu>
          <DropdownItem header>카테고리 3</DropdownItem>

          {categoryList.category3.length > 0 &&
            categoryList.category3.map((data, index) => {
              return (
                <DropdownItem
                  value={data.category3}
                  onClick={(e) => {
                    setSelectCategorys(() => ({
                      ...selectCategorys,
                      category3: e.target.value,
                      category4: "",
                    }));
                    SetIsOpen(() => {
                      return { ...isOpen, category3: false };
                    });
                  }}
                  key={index}
                >
                  {data.category3}
                </DropdownItem>
              );
            })}
        </DropdownMenu>
      </Dropdown>
      {/* 카테고리 4번 */}
      <Dropdown
        isOpen={isOpen.category4}
        toggle={() => {
          SetIsOpen({ ...isOpen, category4: !isOpen.category4 });
        }}
      >
        <DropdownToggle color="light" caret>
          {selectCategorys.category4 ? selectCategorys.category4 : "카테고리 4"}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>카테고리 4</DropdownItem>

          {categoryList.category4.length > 0 &&
            categoryList.category4.map((data, index) => {
              return (
                <DropdownItem
                  value={data.category4}
                  onClick={(e) => {
                    setSelectCategorys(() => ({
                      ...selectCategorys,
                      category4: e.target.value,
                    }));
                    SetIsOpen(() => {
                      return { ...isOpen, category4: false };
                    });
                  }}
                  key={index}
                >
                  {data.category4}
                </DropdownItem>
              );
            })}
        </DropdownMenu>
      </Dropdown>
      {/* 초기화 버튼  */}
      <Button
        className="resetBtn"
        onClick={() => {
          setSelectCategorys({
            category1: "",
            category2: "",
            category3: "",
            category4: "",
          });

          SetIsOpen(() => {
            return { ...isOpen, category1: false };
          });
        }}
      >
        초기화
      </Button>
      {/* 검색 버튼 */}
      <Button
        onClick={() => {
          setSearchClick(!searchClick);
        }}
      >
        검색
      </Button>
    </div>
  );
  // api - 카테고리 목록 가져오기
  function getCategoryList({ num, category1, category2, category3 }) {
    axios
      .post("api/product?type=category", {
        num,
        category1,
        category2,
        category3,
      })
      .then((response) => {
        try {
          const list = response.data.json;
          if (list) {
            setCategoryList((cateList) => {
              const newCategoryList = categoryList;
              const key = Object.keys(cateList)[num - 1];
              newCategoryList[key] = list;
              return newCategoryList;
            });
          }
        } catch (error) {
          alert("카테고리를 가져오는 중 오류가 발생하였습니다.");
        }
      })
      .catch((error) => {});
  }
}

export default SearchSaveProduct;
