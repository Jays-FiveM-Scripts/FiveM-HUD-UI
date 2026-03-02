// App.jsx
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import RightContainer from "./RightContainer";
import LeftContainer from "./LeftContainer";

import "./App.css";

function App() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onMessage = (event) => {
      const d = event.data || {};
      if (d.type === "hud:visible") {
        setVisible(!!d.visible);
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  if (!visible) return null;

  return (
    <div className="flex w-full h-full justify-between">
      <LeftContainer />
      <RightContainer />
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);