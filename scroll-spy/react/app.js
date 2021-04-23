import r from "react";
import rd from "react-dom";

import "./style.css";

const e = r.createElement;

rd.render(e(App), document.getElementById("root"));

// Nav content click 시, scrollIntoView
// scroll 시 Nav content 하이라이트 (IntersectionObserver 로 scroll 이벤트 최적화)
// resize 시 Nav content 하이라이트 반영 (IntersectionObserver 로 최적화)

function App() {
  // ISSUE) viewIndex 가 -1로 바로 바뀐다?
  const [viewIndex, setViewIndex] = r.useState(0);
  const contentRef = r.useRef([]); // content DOM 을 기록

  const pages = Array.from({ length: 8 }).map((_, index) => index + 1);

  // closure 로 index 를 기억한다.
  const moveToPage = (index) => () => {
    contentRef.current[index].scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  };

  const scrollSpyObserver = new IntersectionObserver(
    (entries) => {
      // 완전히 view 에 들어왔을떄는 Intersection 이 없다. 따라서 빈 객체로 해결한다.
      const { target } = entries.find((entry) => entry.isIntersecting) || {};

      const targetIndex = contentRef.current.indexOf(target);

      if (~targetIndex) setViewIndex(targetIndex);
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    }
  );

  r.useEffect(() => {
    contentRef.current.forEach((contentEl) => scrollSpyObserver.observe(contentEl));

    return () => {
      contentRef.current.forEach((contentEl) => scrollSpyObserver.unobserve(contentEl));
    };
  }, [viewIndex]);

  return e(
    "div",
    { id: "app" },
    e(Nav, { pages, viewIndex, moveToPage }),
    e(
      "div",
      { id: "contents" },
      pages.map((page, index) => e(Content(), { key: page, ref: (r) => (contentRef.current[index] = r), page }))
    )
  );
}

function Content() {
  return r.forwardRef(({ page }, ref) => e("div", { ref }, page));
}

function Nav({ pages, viewIndex, moveToPage }) {
  console.log(viewIndex);

  return e(
    "ul",
    { id: "nav" },
    pages.map((page, index) =>
      e(
        "li",
        { key: page, className: viewIndex === index ? "on" : "" },
        e("button", { onClick: moveToPage(index) }, page)
      )
    )
  );
}
