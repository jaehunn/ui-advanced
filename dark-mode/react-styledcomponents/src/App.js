import { ThemeProvider } from "styled-components";
import { GlobalStyle, themeStyle } from "./styles";
import { Title, ToggleButton, Article } from "./components";
import { useTheme } from "./hooks";

const App = () => {
  // theme 을 state 로 관리한다.

  // 기본값은
  // 1. localStorage 의 theme 으로 한다.
  // 2. localStorage 의 theme 이 없다면, os level 의 theme 를 확인한다.

  // 토글 함수로 setTheme 하고, theme 이 바뀌었을 때 useEffect 로 localStorage 의 theme 을 바꾼다.

  // useTheme Custom hook: theme 을 상태로 가지면서 변경을 감지한다. 토글링 함수를 가진다.
  const [theme, toggleTheme] = useTheme();

  return (
    <ThemeProvider theme={themeStyle[theme]}>
      <GlobalStyle />
      <Title>Light / Dark Mode - Toggle Button</Title>
      <ToggleButton onClick={toggleTheme} />
      <Article>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum optio ab porro magni in sunt ipsam, doloremque
        minima, itaque sapiente consequatur, repellat velit voluptatum accusantium aperiam. Nostrum sunt reprehenderit
        nemo!
      </Article>
    </ThemeProvider>
  );
};

export default App;
