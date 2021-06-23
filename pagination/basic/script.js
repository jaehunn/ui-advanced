const data = [
  {
    id: 1,
    profile_url: "https://picsum.photos/id/1/50/50",
    author: "abc_1",
    content: "UI 테스트는 어떻게 진행하나요",
    createdAt: "2020-05-01",
  },
  {
    id: 2,
    profile_url: "https://picsum.photos/id/2/50/50",
    author: "abc_2",
    content: "막히면 대답은 빨리 해주나요",
    createdAt: "2020-05-02",
  },
  {
    id: 3,
    profile_url: "https://picsum.photos/id/3/50/50",
    author: "abc_3",
    content: "코드에러가 발생했는데 어딘지 모르겠어요",
    createdAt: "2020-05-03",
  },
  {
    id: 4,
    profile_url: "https://picsum.photos/id/4/50/50",
    author: "abc_4",
    content: "Javascript 기초가 부족한데 좋은 가이드 있나요",
    createdAt: "2020-05-04",
  },
  {
    id: 5,
    profile_url: "https://picsum.photos/id/5/50/50",
    author: "abc_5",
    content: "Typescript는 어떤점에서 좋나요",
    createdAt: "2020-05-05",
  },
  {
    id: 6,
    profile_url: "https://picsum.photos/id/6/50/50",
    author: "abc_6",
    content: "React 소스 배포는 보통 어떤식으로 하나요.",
    createdAt: "2020-05-06",
  },
  {
    id: 7,
    profile_url: "https://picsum.photos/id/7/50/50",
    author: "abc_7",
    content: "주변에 React 개발자 있나요",
    createdAt: "2020-05-07",
  },
  {
    id: 8,
    profile_url: "https://picsum.photos/id/8/50/50",
    author: "abc_8",
    content: "Typescript 배워 보려고 합니다. 어떻게 배우는게 빠를까요",
    createdAt: "2020-05-08",
  },
  {
    id: 9,
    profile_url: "https://picsum.photos/id/9/50/50",
    author: "abc_9",
    content: "컴포넌트 테스트는 어떻게 하나요.",
    createdAt: "2020-05-09",
  },
  {
    id: 10,
    profile_url: "https://picsum.photos/id/10/50/50",
    author: "abc_10",
    content: "storybook은 무엇인가요.",
    createdAt: "2020-05-10",
  },
  {
    id: 11,
    profile_url: "https://picsum.photos/id/11/50/50",
    author: "abc_11",
    content: "주변에 React 개발자 있나요",
    createdAt: "2020-05-11",
  },
  {
    id: 12,
    profile_url: "https://picsum.photos/id/12/50/50",
    author: "abc_12",
    content: "주변에 React 개발자 있나요",
    createdAt: "2020-05-12",
  },
  {
    id: 13,
    profile_url: "https://picsum.photos/id/13/50/50",
    author: "abc_13",
    content: "주변에 React 개발자 있나요",
    createdAt: "2020-05-13",
  },
  {
    id: 14,
    profile_url: "https://picsum.photos/id/14/50/50",
    author: "abc_14",
    content: "Next.js 가이드 주세요.14",
    createdAt: "2020-05-14",
  },
  {
    id: 15,
    profile_url: "https://picsum.photos/id/15/50/50",
    author: "abc_15",
    content: "vue vs react 뭐가 좋나요.",
    createdAt: "2020-05-15",
  },
  {
    id: 16,
    profile_url: "https://picsum.photos/id/16/50/50",
    author: "abc_16",
    content: "Atomic 디자인은 무엇인가요",
    createdAt: "2020-05-16",
  },
  {
    id: 17,
    profile_url: "https://picsum.photos/id/18/50/50",
    author: "abc_17",
    content: "UI 테스트는 어떻게 진행하나요",
    createdAt: "2020-05-17",
  },
  {
    id: 18,
    profile_url: "https://picsum.photos/id/18/50/50",
    author: "abc_18",
    content: "local storage는 언제 사용하는게 좋나요.",
    createdAt: "2020-05-18",
  },
  {
    id: 19,
    profile_url: "https://picsum.photos/id/19/50/50",
    author: "abc_19",
    content: "막히면 대답은 빨리 해주나요",
    createdAt: "2020-05-19",
  },
  {
    id: 20,
    profile_url: "https://picsum.photos/id/20/50/50",
    author: "abc_20",
    content: "Form 처리는 어떻게 하면 깔끔할까요",
    createdAt: "2020-05-20",
  },
  {
    id: 21,
    profile_url: "https://picsum.photos/id/21/50/50",
    author: "abc_21",
    content: "typescript도 배워 보려고 합니다. 어떻게 배우는게 빠를까요",
    createdAt: "2020-05-21",
  },
  {
    id: 22,
    profile_url: "https://picsum.photos/id/22/50/50",
    author: "abc_22",
    content: "주변에 React 개발자 있나요",
    createdAt: "2020-05-22",
  },
];

function Pagination() {
  // 어떤 멤버가 필요할까?
  // 전체 데이터를 페이지 별로 일정하게 나눠 보여야한다.
  // page index 를 설정하자.
  this.currentPageIndex = 1;

  // 5개의 페이지에 걸쳐서 보여줄 것이다.
  // 자연스럽게 데이터 개수 / 페이지 당 보여줄 데이터 개수로 페이지 개수가 도출된다.
  this.itemsPerPage = 5;

  // 소숫점(페이지 당 보여줄 데이터를 채우지 못한 나머지 데이터 개수) 을 살려서 페이지 하나로 가져가야한다. -> 올림처리
  // @see https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil
  this.pages = Math.ceil(data.length / this.itemsPerPage);
}

Pagination.prototype.renderItem = function (items) {
  return items.reduce((result, { profile_url, author, content, createdAt }) => {
    return (
      result +
      `
        <div class="item">
          <img src="${profile_url}" alt="" />
          <span class="author">${author}</span>
          <div class="createdAt">${createdAt}</div>
          <div class="content">${content}</div>
        </div>
        `
    );
  }, "");
};

Pagination.prototype.getItemsByPageIndex = function (pageIndex) {
  const startItemIndex = (pageIndex - 1) * this.itemsPerPage;
  const endItemIndex = pageIndex * this.itemsPerPage;

  // 바뀌기 전 인덱스로 범위잡고 업데이트한다.
  this.currentPageIndex = pageIndex;

  // [0. ...index)
  return data.slice(startItemIndex, endItemIndex);
};

Pagination.prototype.renderPageButton = function () {
  return Array(this.itemsPerPage)
    .fill()
    .reduce((result, _, index) => {
      // active 된 버튼은 현재 페이지 인덱스 멤버를 참조하면 되겠다.
      const className = index + 1 === this.currentPageIndex ? "active" : "";

      return result + `<button class="${className}">${index + 1}</button>`;
    }, "");
};

document.addEventListener("DOMContentLoaded", () => {
  const pagination = new Pagination();

  // 요소 타게팅
  // 1. item 들을 감싸는 wrapper -> item 들을 렌더링
  // 2. page button -> 클릭 이벤트
  const $itemContainer = document.querySelector(".item-container");
  const $pageContainer = document.querySelector(".page-container"); // 버블링

  // 마운트때 데이터를 렌더링 시켜야한다.
  // 첫 페이지에 대해 렌더링하자.
  const items = pagination.getItemsByPageIndex(1);
  $itemContainer.innerHTML = pagination.renderItem(items);

  // 버튼은 고정적으로 렌더링된다.
  $pageContainer.innerHTML = pagination.renderPageButton();

  // 버튼 클릭이벤트 등록
  $pageContainer.addEventListener("click", ({ target }) => {
    const targetPageIndex = target.innerText;

    const items = pagination.getItemsByPageIndex(+targetPageIndex);
    $itemContainer.innerHTML = pagination.renderItem(items);

    // 멤버에 접근할 수 없다.
    // this.currentPageIndex = +targetPageIndex;

    $pageContainer.innerHTML = pagination.renderPageButton();
  });
});
