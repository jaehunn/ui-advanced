import r from "react";

const e = r.createElement;

export default function Item({ id, no, text }) {
  return e(
    "li",
    {},
    e("div", { className: "no" }, no),
    e("div", { className: "content" }, e("div", { className: "_id" }, id), e("div", { className: "text" }, text))
  );
}
