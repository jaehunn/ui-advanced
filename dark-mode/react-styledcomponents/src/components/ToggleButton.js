import { FaSun, FaMoon } from "react-icons/fa";
import styled from "styled-components";

// 기본 테마는 light 로 한다.
const ToggleContainer = styled.div`
  position: relative;
  width: 100px;
  height: 50px;
  margin: 0 auto;
  cursor: pointer;
`;

const ToggleSwitch = styled.div`
  position: absolute;
  top: 2px;
  left: ${({ theme }) => theme.toggleButtonSwitchLeft}; // 2px <-> 52px
  width: 46px;
  height: 46px;
  background-color: #fff;
  border-radius: 100%;
  transition: left 0.3s;
`;

const ToggleText = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.toggleButtonTextColor}; // #3dbf87 <-> #fc3164
  border-radius: 25px;
  box-shadow: 2px 2px 5px 0 rgba(50, 50, 50, 0.75);
  transition: background-color 0.3s;
`;

// 각각 50% 를 차지하는 아이콘이 Switcher 에 가려지거나 보여진다.
const ToggleIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 50px;
  color: #fff;
`;

const ToggleButton = ({ onClick: toggleTheme }) => (
  <ToggleContainer onClick={toggleTheme}>
    <ToggleSwitch />
    <ToggleText>
      <ToggleIcon>
        <FaSun sizd="24" />
      </ToggleIcon>
      <ToggleIcon>
        <FaMoon sizd="24" />
      </ToggleIcon>
    </ToggleText>
  </ToggleContainer>
);

export default ToggleButton;
