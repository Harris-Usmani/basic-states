import React, { useState } from 'react';

function App() {
  const [isOn, setIsOn] = useState(false);

  function toggleButton() {
    if (isOn) {
      setIsOn(false); // Set to false if it's currently true
    } else {
      setIsOn(true);  // Set to true if it's currently false
    }
  }

  return (
    <div>
      <h1>Toggle Button Example</h1>
      <button onClick={toggleButton}>
        {isOn ? 'ON' : 'OFF'}
      </button>
    </div>
  );
}

export default App;
