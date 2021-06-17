import React, { useState } from "react";
import { Blackout, Button, Modal } from ".";

const App = () => {
  const [visible, setVisible] = useState(false); // modal visible

  const visibleHandler = (visible) => setVisible(visible); // visible 을 받아서 세팅한다.

  // 1. Blackout: visible 로 스타일 설정, onVisible 로 클릭이벤트 설정
  // 2. Modal: visible 로 스타일 설정
  // 3. Button: onVisible 로 클릭이벤트 설정

  return (
    <div className="App">
      <Blackout visible={visible} onVisible={visibleHandler} />
      <Button title="Open" onVisible={visibleHandler} />
      <Modal visible={visible}>
        <Button title="Close" onVisible={visibleHandler} />
      </Modal>
    </div>
  );
};

export default App;
