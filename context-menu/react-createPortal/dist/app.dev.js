"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

require("./style.css");

var _data = _interopRequireDefault(require("./data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var e = _react["default"].createElement;

_reactDom["default"].render(e(App, {}), document.getElementById("app"));

function App() {
  var _r$useState = _react["default"].useState(null),
      _r$useState2 = _slicedToArray(_r$useState, 2),
      openedIndex = _r$useState2[0],
      setOpen = _r$useState2[1]; //
  // mockData 를 맵핑을 돌려 만든 details 요소에 대한 정보가 리스트형태로 담길 것이다.


  var detailRefs = _react["default"].useRef([]);

  var toggleHandler = function toggleHandler(index) {
    return function (e) {
      e.preventDefault();
      e.stopPropagation(); // 토글된 요소의 부모요소에 open 속성이 있는 경우에만 토글된다.

      setOpen(e.target.parentElement.open ? null : index);
    };
  };

  var removeHandler = function removeHandler(e) {
    if (e.target.nodeName !== "P") setOpen(null);
  };

  _react["default"].useEffect(function () {
    document.body.addEventListener("click", removeHandler);
    return function () {
      document.body.removeEventListener("click", removeHandler);
    };
  }, []);

  return e("div", {}, e("div", {
    className: "wrapper"
  }, e("header", {}, e("h2", {}, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, officiis!"), e("ul", {}, e("li", {}, "Lorem ipsum dolor sit amet."), e("li", {}, "Lorem ipsum dolor"), e("li", {}, "Lorem, ipsum dolor."), e("li", {}, "Lorem ipsum dolor sit."))), // useRef() 로 설정한 값은 current 로 접근할 수 있다.
  _data["default"].map(function (_ref, index) {
    var text = _ref.text,
        context = _ref.context;
    return e(_react["default"].forwardRef(Detail), {
      key: "detail".concat(index),
      ref: function ref(el) {
        detailRefs.current[index] = el;
      },
      text: text,
      context: context,
      open: openedIndex === index,
      onToggle: toggleHandler(index)
    });
  })), e(ContextPortal, {
    children: e("p", {}, _data["default"][openedIndex].context),
    target: detailRefs.current[openedIndex]
  }));
} // Detail 마다 p 요소(context) 를 미리 배치시키지않고
// forwardRef


function Detail(_ref2, ref) {
  var text = _ref2.text,
      open = _ref2.open,
      onToggle = _ref2.onToggle;
  return e("details", {
    open: open,
    ref: ref
  }, e("summary", {
    onClick: onToggle
  }, text));
}

function ContextPortal(_ref3) {
  var children = _ref3.children,
      target = _ref3.target;
  return target ? _reactDom["default"].createPortal(children, target) : null;
}