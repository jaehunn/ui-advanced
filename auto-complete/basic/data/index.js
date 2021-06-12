const mockData = [
  { text: "Kenneth" },
  { text: "Kali" },
  { text: "Kellan" },
  { text: "Jack" },
  { text: "James" },
  { text: "John" },
  { text: "Dana" },
  { text: "Danny" },
  { text: "Daniel" },
  { text: "Dacey" },
  { text: "Aiden" },
  { text: "Adam" },
  { text: "Adrian" },
  { text: "Ben" },
  { text: "Benji" },
  { text: "Benjamin" },
  { text: "Benny" },
];

// view 와 data 를 연결하는 어댑터클래스
class RequestMockDataAdapter {
  constructor() {}
  get(url, param) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          param
            ? mockData.filter(({ text }) => {
                const itemTextToLowerCase = text.toLowerCase();
                const paramTextToLowerCase = param.toLowerCase();
                const isMatched = !!~itemTextToLowerCase.indexOf(paramTextToLowerCase);

                return isMatched;
              })
            : []
        );
      }, 300);
    });
  }
}

export default RequestMockDataAdapter;
