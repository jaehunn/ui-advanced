import React, { useState } from "react";
import { Modal, Blackout, Button } from ".";

const App = () => {
  // root state 로 관리 (modalVisible)
  const [modalVisible, setModalVisible] = useState(false);

  // click handler
  const modalVisibleHandler = (isVisible) => setModalVisible(isVisible);

  return (
    <div className="App">
      <Blackout modalVisible={modalVisible} modalVisibleHandler={modalVisibleHandler}>
        <Button modalVisibleHandler={() => modalVisibleHandler(false)}>Close</Button>
      </Blackout>
      <Modal modalVisible={modalVisible} modalVisibleHandler={modalVisibleHandler} />
      <Button modalVisibleHandler={() => modalVisibleHandler(true)}>Open</Button>
    </div>
  );
};

export default App;
