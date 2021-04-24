import r, { useRef, useEffect } from "react";

const e = r.createElement;

export default function FetchMore({ loading, setPage }) {
  // ref 로 요소를 타겟팅한다.
  const fetchMoreTrigger = useRef(null);

  // intersecting 되면 root 상태의 page 를 변화시킨다.
  // page 상태가 변하면 root 컴포넌트 useEffect 에서 감지한다.
  const fetchMoreObserver = new IntersectionObserver(([{ isIntersecting }]) => {
    if (isIntersecting) setPage((page) => page + 1);
  });

  // 컴포넌트가 마운트되고 observe 한다. deps 를 빈배열로 설정해 마운트에만 관여한다.
  // 항상 ref 접근시 current 로 접근!
  useEffect(() => {
    fetchMoreObserver.observe(fetchMoreTrigger.current);

    return () => {
      fetchMoreObserver.unobserve(fetchMoreTrigger.current);
    };
  }, []);

  return e("div", { id: "fetchMore", className: loading ? "loading" : "", ref: fetchMoreTrigger });
}
