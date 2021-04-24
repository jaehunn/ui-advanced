import r, { useState, useEffect } from "react";
import rd from "react-dom";

import List from "./List";
import FetchMore from "./FetchMore";

import { getList } from "./listBuilder";
import { dummyFetcher } from "./utils";

const e = r.createElement;

rd.render(e(App), document.getElementById("root"));

function App() {
  // 상태: list 정보, page 값, loading 값
  const [page, setPage] = useState(0);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1. useEffect 로 loading 처리와 dummey data 를 받아와야한다.
  useEffect(async () => {
    setLoading(true);

    // getList 에 page 값을 같이넘겨 no 를 맵핑한 list 를 받는다.
    // dummyFetcher 는 범위 내 일정시간이 걸리는 Timer 다.
    const list = await dummyFetcher(getList, page);

    // 받은 data 를 state 로 관리한다. 기존 list 뒤에 이어 붙힌다.
    setList((prev) => [...prev, ...list]);

    setLoading(false);

    // page 값이 달라지면 (FetchMore 에서 IntersectionObserver 로 렌더링을 트리거했을때 page 값이 증가한다.) 데이터를 받고 렌더링한다.
  }, [page]);

  // app 의 class 에 js 를 사용해 loading class 를 동적으로 제어한다.
  return e(
    "div",
    { id: "app", className: page === 0 && loading ? "loading" : "" },
    e(List, { list }), // list 를 맵핑돌면서 렌더링하는 컴포넌트
    e(FetchMore, { loading: page && loading, setPage }) // IntersectionObserver 로 intersecting 를 감지하는 컴포넌트
  );
}
