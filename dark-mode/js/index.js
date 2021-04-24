// 1. 마운트시 handling
// 2. 버튼 클릭 시 handling

// localStorage 의 값을 판단하고 -> 새 값으로 반전시킨 뒤 -> active 한다. (toggle 로)
// toggle 은 조건에 따라 classList.add(), classList.remove() 를 간추릴 수 있다.

document.addEventListener("DOMContentLoaded", () => {
  // 로컬 스토리지로  테마를 { theme: dark or light } 로 관리할 것이다.
  const theme = localStorage.getItem("theme");

  if (!theme) localStorage.setItem("theme", "light"); // 첫 마운트에는 라이트로 설정한다.

  // localStorage 의 theme 에 따라 active 해야한다.
  // 초기 theme 이 dark 로 설정되어있을 수도 있다. 따라서 force 값으로 첫 toggle 을 판단해야한다.
  document.body.classList.toggle("dark", theme === "dark");

  // body 의 active 를 토글할때 깜빡이는 현상이 일어난다 따라서 초기에 완전히 visibility 를 hidden 으로 해서 지워주어야한다.
  setTimeout(() => {
    document.body.style.visibility = "visible";
  }, 300);
});

document.querySelector(".toggle-button").onclick = (e) => {
  const theme = localStorage.getItem("theme");

  // 이전 값을 보고 반전시킨다.
  localStorage.setItem("theme", `${theme === "dark" ? "light" : "dark"}`);

  // dark 클래스에 대해 토글한다.
  document.body.classList.toggle("dark");
};
