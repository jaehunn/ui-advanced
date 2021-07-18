"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.items = exports.getCurrentPageItems = void 0;

var _toolkit = require("@reduxjs/toolkit");

var initialState = {
  items: [{
    id: 1,
    profile_url: "https://picsum.photos/id/1/50/50",
    author: "abc_1",
    content: "UI 테스트는 어떻게 진행하나요",
    createdAt: "2020-05-01"
  }, {
    id: 2,
    profile_url: "https://picsum.photos/id/2/50/50",
    author: "abc_2",
    content: "막히면 대답은 빨리 해주나요",
    createdAt: "2020-05-02"
  }, {
    id: 3,
    profile_url: "https://picsum.photos/id/3/50/50",
    author: "abc_3",
    content: "코드에러가 발생했는데 어딘지 모르겠어요",
    createdAt: "2020-05-03"
  }, {
    id: 4,
    profile_url: "https://picsum.photos/id/4/50/50",
    author: "abc_4",
    content: "Javascript 기초가 부족한데 좋은 가이드 있나요",
    createdAt: "2020-05-04"
  }, {
    id: 5,
    profile_url: "https://picsum.photos/id/5/50/50",
    author: "abc_5",
    content: "Typescript는 어떤점에서 좋나요",
    createdAt: "2020-05-05"
  }, {
    id: 6,
    profile_url: "https://picsum.photos/id/6/50/50",
    author: "abc_6",
    content: "React 소스 배포는 보통 어떤식으로 하나요.",
    createdAt: "2020-05-06"
  }, {
    id: 7,
    profile_url: "https://picsum.photos/id/7/50/50",
    author: "abc_7",
    content: "주변에 React 개발자 있나요",
    createdAt: "2020-05-07"
  }, {
    id: 8,
    profile_url: "https://picsum.photos/id/8/50/50",
    author: "abc_8",
    content: "Typescript 배워 보려고 합니다. 어떻게 배우는게 빠를까요",
    createdAt: "2020-05-08"
  }, {
    id: 9,
    profile_url: "https://picsum.photos/id/9/50/50",
    author: "abc_9",
    content: "컴포넌트 테스트는 어떻게 하나요.",
    createdAt: "2020-05-09"
  }, {
    id: 10,
    profile_url: "https://picsum.photos/id/10/50/50",
    author: "abc_10",
    content: "storybook은 무엇인가요.",
    createdAt: "2020-05-10"
  }, {
    id: 11,
    profile_url: "https://picsum.photos/id/11/50/50",
    author: "abc_11",
    content: "주변에 React 개발자 있나요",
    createdAt: "2020-05-11"
  }, {
    id: 12,
    profile_url: "https://picsum.photos/id/12/50/50",
    author: "abc_12",
    content: "주변에 React 개발자 있나요",
    createdAt: "2020-05-12"
  }, {
    id: 13,
    profile_url: "https://picsum.photos/id/13/50/50",
    author: "abc_13",
    content: "주변에 React 개발자 있나요",
    createdAt: "2020-05-13"
  }, {
    id: 14,
    profile_url: "https://picsum.photos/id/14/50/50",
    author: "abc_14",
    content: "Next.js 가이드 주세요.14",
    createdAt: "2020-05-14"
  }, {
    id: 15,
    profile_url: "https://picsum.photos/id/15/50/50",
    author: "abc_15",
    content: "vue vs react 뭐가 좋나요.",
    createdAt: "2020-05-15"
  }, {
    id: 16,
    profile_url: "https://picsum.photos/id/16/50/50",
    author: "abc_16",
    content: "Atomic 디자인은 무엇인가요",
    createdAt: "2020-05-16"
  }, {
    id: 17,
    profile_url: "https://picsum.photos/id/18/50/50",
    author: "abc_17",
    content: "UI 테스트는 어떻게 진행하나요",
    createdAt: "2020-05-17"
  }, {
    id: 18,
    profile_url: "https://picsum.photos/id/18/50/50",
    author: "abc_18",
    content: "local storage는 언제 사용하는게 좋나요.",
    createdAt: "2020-05-18"
  }, {
    id: 19,
    profile_url: "https://picsum.photos/id/19/50/50",
    author: "abc_19",
    content: "막히면 대답은 빨리 해주나요",
    createdAt: "2020-05-19"
  }, {
    id: 20,
    profile_url: "https://picsum.photos/id/20/50/50",
    author: "abc_20",
    content: "Form 처리는 어떻게 하면 깔끔할까요",
    createdAt: "2020-05-20"
  }, {
    id: 21,
    profile_url: "https://picsum.photos/id/21/50/50",
    author: "abc_21",
    content: "typescript도 배워 보려고 합니다. 어떻게 배우는게 빠를까요",
    createdAt: "2020-05-21"
  }, {
    id: 22,
    profile_url: "https://picsum.photos/id/22/50/50",
    author: "abc_22",
    content: "주변에 React 개발자 있나요",
    createdAt: "2020-05-22"
  }],
  currentPageNum: 1,
  itemsPerPage: 5,
  currentPageItems: []
}; // createSlice() 통해 ducks 패턴으로 정의합시다.

var itemsSlice = (0, _toolkit.createSlice)({
  name: "items",
  initialState: initialState,
  reducers: {
    // action 을 정의합시다.
    // 넘어온 action pageIndex 에 대해서 currentPageNum 에 대해서 items 를 가공해 currentPageItems 에 적재합시다.
    getCurrentPageItems: function getCurrentPageItems(state, action) {
      var items = state.items,
          itemsPerPage = state.itemsPerPage;
      var targetPageNum = action.payload.targetPageNum;
      var startIndexOfCurrentPageItemList = (targetPageNum - 1) * itemsPerPage;
      var endIndexOfCurrentPageItemList = targetPageNum * itemsPerPage; // 데이터를 가공해서 적재하고

      state.currentPageItems = items.slice(startIndexOfCurrentPageItemList, endIndexOfCurrentPageItemList); // payload 를 업데이트한다.

      state.currentPageNum = targetPageNum;
    }
  }
}); // actions 로 접근해서 action 드 중 getCurrentPageItems 을 뽑아 export 한다.

var getCurrentPageItems = itemsSlice.actions.getCurrentPageItems; // reducer 를 export 한다.

exports.getCurrentPageItems = getCurrentPageItems;
var items = itemsSlice.reducer;
exports.items = items;