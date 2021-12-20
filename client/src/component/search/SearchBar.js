import { useState } from "react";
import axios from "axios";
import SearchItem from "./SearchItem";
import { Input, CardHeader, ListGroup } from "reactstrap";
function SearchBar({ setSelectedData }) {
  // state
  // input창에 입력되는 데이터의 검색어 자동완성 리스트
  const [searchKeyWords, setSearchKeyWords] = useState([]);
  // input창 focus시 false / 검색어 중 한가지 클릭시 true
  const [isSelectItem, setIsSelectItem] = useState(false);
  return (
    <>
      <CardHeader tag="h5">상품 검색</CardHeader>
      {/* input 창*/}
      <Input
        id="searchBar"
        placeholder="검색어를 입력하세요"
        onFocus={resetIsSelectItem}
        onChange={getSearchRes}
      />
      {/* 검색어 자동 완성 리스트 출력*/}
      {!isSelectItem && searchKeyWords.length > 0 && (
        <ListGroup>
          {searchKeyWords.map((item, index) => (
            <SearchItem
              setSelectedData={setSelectedData}
              setIsSelectItem={setIsSelectItem}
              searchedItem={item[0]}
              key={index}
            />
          ))}
        </ListGroup>
      )}
    </>
  );
  // input 창 focus시 isSelectItem state false로 reset
  function resetIsSelectItem() {
    setIsSelectItem(false);
  }
  // api- 네이버 검색어 자동완성
  function getSearchRes(userInput) {
    axios
      .post("/api/naverApi?type=search", { query: userInput.target.value })
      .then((res) => {
        setSearchKeyWords(res.data.items[0]);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
}

export default SearchBar;
