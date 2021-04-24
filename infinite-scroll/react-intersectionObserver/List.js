import r from "react";
import Item from "./Item";

const e = r.createElement;

export default function List({ list }) {
  return e(
    "ul",
    { id: "list" },
    // item 을 해체할당하는 부분이 인상적이다.
    // <Item {...item} key={`item_${i}`} /> cra 에서 이렇게 할당할 수도 있다.
    list.map(({ id, no, text }, index) => e(Item, { id, no, text, key: `item_${index}` }))
  );
}
