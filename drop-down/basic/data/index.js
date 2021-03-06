const optionData = [
  {
    id: "",
    label: "선택하세요.",
  },
  {
    id: "0001", // relation
    label: "Google",
  },
  {
    id: "0002",
    label: "Yahoo",
  },
  {
    id: "0003",
    label: "Wiki",
  },
  {
    id: "0004",
    label: "FaceBook",
  },
];

const userData = [
  {
    id: "01",
    username: "Kenneth",
    favorites: "0001",
  },
  {
    id: "02",
    username: "John",
    favorites: "0001",
  },
  {
    id: "03",
    username: "Daniel",
    favorites: "0002",
  },
  {
    id: "04",
    username: "Peter",
    favorites: "0004",
  },
  {
    id: "05",
    username: "Brian",
    favorites: "0003",
  },
];

export const retrieveOptionData = () => optionData;
export const retrieveOptionItemById = (id) => optionData.find((item) => item.id === id);
export const retrieveUserData = () => userData;
