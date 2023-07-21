// App.tsx
import React, { useRef } from "react";
import SeatchartJS, { Options } from "seatchart";
import Seatchart from "./Seatchart";

import "seatchart/dist/seatchart.min.css";
import "./App.css";

const options: Options = {
  map: {
    rows: 7,
    columns: 7,
    seatTypes: {
      default: {
        label: "Economy",
        cssClass: "economy",
        price: 10,
      },
    },
  },
};

const App = () => {
  const seatchartRef = useRef<SeatchartJS>();

  const handleClick = () => {
    const index = { row: 0, col: 6 };
    const seat = seatchartRef.current?.getSeat(index);

    seatchartRef.current?.setSeat(index, {
      state: seat?.state === "selected" ? "available" : "selected",
    });
  };

  return (
    <div>
      <button onClick={handleClick}>Toggle Seat</button>
      <Seatchart ref={seatchartRef} options={options} />
    </div>
  );
};

export default App;