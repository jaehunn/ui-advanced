import r from "react";
import rd from "react-dom";

import "./style.css";

import mockData from "./data";

const e = r.createElement;

rd.render(e(App, {}), document.getElementById("app"));

function App() {
  // 팝오버될 요소의 인덱스를 단일 값으로 관리한다.
  // 상태가 바뀌면 렌더링되므로 open 을 상태변수로 관리하면 알아서 바뀌게된다.
  const [openedIndex, setOpenedIndex] = r.useState(null);

  // index 를 자유변수로 갖는 클로저를 반환한다.
  const toggleHandler = (index) => (e) => {
    // preventDefault 로 refresh 를 막고, stopPropagation 으로 이벤트 버블링을 차단한다.
    // submit 하는 form 에서 preventDefault 할 경우 전송이벤트만 이루어진다.
    // 버블링을 차단하는 이유는 토글이 전파되어 body 에서 감지되면 매번 removeHandler 가 발생한다.
    e.preventDefault();
    e.stopPropagation();

    // 토글 (on <-> off)
    setOpenedIndex(openedIndex === index ? null : index);
  };

  const removeHandler = (e) => {
    // context 가 아니라면 팝오버를 끈다.
    if (e.target.nodeName !== "P") setOpenedIndex(null);
  };

  // 만약 deps 가 빈 배열(리렌더링이 아닌 첫마운트시에만 발생)이 아니라면, 모든 상태변화에 대해서 감지할 것이다.
  // 여기서 상태는 opened 며 클릭 이벤트 발생시 P 요소가 아니라면 상태가 변한다.
  // Q) deps 에 빈 배열을 넣는 편이 낫지 않을까
  r.useEffect(() => {
    document.body.addEventListener("click", removeHandler);

    return () => {
      document.body.removeEventListener("click", removeHandler);
    };
  }, []);

  return e(
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
    mockData.map(({ text, context }, index) =>
      e(Detail, { key: `detail${index}`, text, context, open: openedIndex === index, onToggle: toggleHandler(index) })
    )
  );
}

function Detail({ text, context, open, onToggle }) {
  // onToggle 버블링이 p 에 영향을 주지않는다. (분리되어있음)
  return e("details", { open }, e("summary", { onClick: onToggle }, text), e("p", {}, context));
}
