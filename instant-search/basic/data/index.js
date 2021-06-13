const mockData = [{ word: "서울" }, { word: "부산" }, { word: "대전" }, { word: "태권브이" }, { word: "서쪽" }, { word: "부모님" }, { word: "대한민국" }, { word: "서쪽마을" }];

const retrieveWordData = (targetWord) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockData.filter(({ word }) => ~word.indexOf(targetWord))), 300);
  });
};

export default retrieveWordData;
