document.addEventListener("DOMContentLoaded", renderTabs);

// 모든 리소스가 패치되고 핸들링한다.
// 1. spinner 를 가린다.
// 2. tabsData 를 가져와서 렌더링한다.
async function renderTabs() {
  let currentTabIndex = 0;

  const $tabs = document.querySelector(".tabs");
  const $spinner = document.querySelector(".spinner");

  try {
    const tabsData = await fetchData();

    $spinner.style.display = "none";

    // @see https://developer.mozilla.org/ko/docs/Web/CSS/Using_CSS_custom_properties
    // --tabs-length css 변수에 길이를 재할당한다.
    $tabs.style.setProperty("--tabs-length", tabsData.length);

    // 컴포넌트를 생성한다.
    const navItems =
      tabsData.reduce(
        (result, { title }, index) => (result += `<div class="tab" data-index="${index}">${title}</div>`),
        "<nav>"
      ) + '<span class="glider"></span></nav>';

    // currentTabIndex 로 content 의 active 를 설정한다. active 판정된 content 가 화면에 보인다.
    const contentItems = tabsData.map(
      ({ content }, index) => `<div class="tab-content ${index === currentTabIndex ? "active" : ""}">${content}</div>`
    );

    $tabs.innerHTML = [...navItems, ...contentItems].join("");
  } catch (err) {
    console.error(err);
  }

  // 생성된 tabs 컴포넌트에서 클릭이벤트를 감지한다. (createTabs 안에서 요소를 렌더링한뒤 핸들러를 붙여야한다.)
  // 1. glider 를 index 로 컨트롤한다.
  // 2. index 로 각 tab 의 컨텐츠를 보이게한다.
  document.querySelector("nav").onclick = (() => {
    // closure
    const $glider = document.querySelector(".glider");
    const $tabContents = document.querySelectorAll(".tab-content");

    // 핸들 로직
    return (e) => {
      // 1. 인덱스를 변경한다.
      currentTabIndex = +e.target.dataset.index;

      // 2. glider 를 움직인다.
      // x 축만 변경
      $glider.style.transform = `translate3D(${currentTabIndex * 100}%, 0, 0)`;

      // 3. active 를 토글하면 remove, add 로직을 합칠 수 있다.
      $tabContents.forEach(($tabContent, index) => {
        $tabContent.classList.toggle("active", index === currentTabIndex);
      });
    };
  })();
}

function fetchData() {
  return new Promise((resolve) => {
    // api call
    setTimeout(() =>
      resolve(
        [
          {
            title: "HTML",
            content: `HTML(HyperText Markup Language) is the most basic building block of the Web. It describes and defines the content of a webpage along with the basic layout of the webpage. Other technologies besides HTML are generally used to describe a web page's appearance/presentation(CSS) or functionality/ behavior(JavaScript).`,
          },
          {
            title: "CSS",
            content: `Cascading Style Sheets(CSS) is a stylesheet language used to describe the presentation of a document written in HTML or XML (including XML dialects such as SVG, MathML or XHTML). CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.`,
          },
          {
            title: "JavaScript",
            content: `JavaScript(JS) is a lightweight interpreted or JIT-compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.`,
          },
        ],
        1000
      )
    );
  });
}
