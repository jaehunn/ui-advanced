import React from "react";
import { Modal, Blackout, Button } from ".";

const App = () => {
  // root state 로 관리 (modalVisible)

  return (
    <div className="App">
      <Blackout />
      <Modal />

      <Button>Open</Button>
    </div>
  );
};

export default App;
