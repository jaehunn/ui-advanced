"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.retrieveUserData = exports.retrieveOptionItemById = exports.retrieveOptionData = void 0;
var optionData = [{
  id: "",
  label: "선택하세요."
}, {
  id: "0001",
  // relation
  label: "Google"
}, {
  id: "0002",
  label: "Yahoo"
}, {
  id: "0003",
  label: "Wiki"
}, {
  id: "0004",
  label: "FaceBook"
}];
var userData = [{
  id: "01",
  userName: "Kenneth",
  favorites: "0001"
}, {
  id: "02",
  userName: "John",
  favorites: "0001"
}, {
  id: "03",
  userName: "Daniel",
  favorites: "0002"
}, {
  id: "04",
  userName: "Peter",
  favorites: "0004"
}, {
  id: "05",
  userName: "Brian",
  favorites: "0003"
}];

var retrieveOptionData = function retrieveOptionData() {
  return optionData;
};

exports.retrieveOptionData = retrieveOptionData;

var retrieveOptionItemById = function retrieveOptionItemById(id) {
  return optionData.find(function (item) {
    return item.id === id;
  });
};

exports.retrieveOptionItemById = retrieveOptionItemById;

var retrieveUserData = function retrieveUserData() {
  return userData;
};

exports.retrieveUserData = retrieveUserData;