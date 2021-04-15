import r from "react";
import rd from "react-dom";

import "./style.css";

import mockData from "./data";

const e = r.createElement;

rd.render(e(App, {}), document.getElementById("app"));

function App() {
  const [openedIndex, setOpenedIndex] = r.useState(null);

  // mockData 를 맵핑을 돌려 만든 details 요소에 대한 정보가 리스트형태로 담길 것이다.
  const detailRefs = r.useRef([]);

  const toggleHandler = (index) => (e) => {
    e.preventDefault();
    e.stopPropagation();

    // 토글된 요소의 부모요소에 open 속성이 있는 경우에만 토글된다.
    setOpenedIndex(e.target.parentElement.open ? null : index);
  };

  const removeHandler = () => {
    setOpenedIndex(null);
  };

  r.useEffect(() => {
    document.body.addEventListener("click", removeHandler);

    return () => {
      document.body.removeEventListener("click", removeHandler);
    };
  }, []);

  return e(
    "div",
    {},
    e(
      "div",
      { className: "wrapper" },
      e(
        "header",
        {},
        e("h2", {}, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, officiis!"),
        e(
          "ul",
          {},
          e("li", {}, "Lorem ipsum dolor sit amet."),
          e("li", {}, "Lorem ipsum dolor"),
          e("li", {}, "Lorem, ipsum dolor."),
          e("li", {}, "Lorem ipsum dolor sit.")
        )
      ),

      // useRef() 로 설정한 값은 current 로 접근할 수 있다.
      mockData.map(({ text, context }, index) =>
        e(r.forwardRef(Detail), {
          key: `detail${index}`,
          ref: (el) => (detailRefs.current[index] = el),
          text,
          context,
          open: openedIndex === index,
          onToggle: toggleHandler(index),
        })
      )
    ),
    e(ContextPortal, {
      children: e("p", {}, mockData[openedIndex]?.context),
      target: detailRefs.current[openedIndex],
    })
  );
}

// Detail 마다 p 요소(context) 를 미리 배치시키지않고
// forwardRef
function Detail({ text, open, onToggle }, ref) {
  return e("details", { open, ref }, e("summary", { onClick: onToggle }, text));
}

function ContextPortal({ children, target }) {
  console.log(children, target);

  if (!target) return null;

  return rd.createPortal(children, target);
}
