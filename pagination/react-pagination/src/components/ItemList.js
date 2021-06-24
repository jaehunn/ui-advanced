import React from "react";
import styled from "styled-components";

const ItemStyle = styled.div`
  padding: 7px 10px;
  text-align: center;

  & > img {
    vertical-align: middle;
    margin-right: 10px;
    border-radius: 50%;
    width: 50px;
    heigth 50px;
  }

  & > div {
    float: right;
    vertical-align: middle;
  }

  & > p {
    margin: 10px 0;
  }
`;

const ItemList = ({ itemList }) => {
  return itemList.map(({ profile_url, author, createdAt, content }, index) => {
    return (
      <ItemStyle key={`item_${index}`}>
        <img src={profile_url} alt="" />
        <span>{author}</span>
        <div>{createdAt}</div>
        <p>{content}</p>
      </ItemStyle>
    );
  });
};

export default ItemList;
