import React, { useState, useEffect } from "react";
import { ItemList, PageButtonList } from "./components";
import { data } from "./data";

const App = () => {
  const [currentPageItemList, setCurrentPageItemList] = useState([]);
  const [currentPageNum, setCurrentPageNum] = useState(1);

  // contant
  const ITEMS_PER_PAGE = 5;
  const pageButtons = Math.ceil(data.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const startIndexOfCurrentPageItemList = (currentPageNum - 1) * ITEMS_PER_PAGE;
    const endIndexOfCurrentPageItemList = currentPageNum * ITEMS_PER_PAGE;

    setCurrentPageItemList(data.slice(startIndexOfCurrentPageItemList, endIndexOfCurrentPageItemList));
  }, [currentPageNum]);

  const pageButtonClickHandler = (targetCurrentPageNum) => setCurrentPageNum(targetCurrentPageNum);

  return (
    <div>
      <ItemList itemList={currentPageItemList} />
      <PageButtonList buttons={pageButtons} activeIndex={currentPageNum - 1} onClickHandler={pageButtonClickHandler} />
    </div>
  );
};

export default App;
