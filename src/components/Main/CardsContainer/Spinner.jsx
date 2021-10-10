import React, { useState } from "react";

export default function Spinner() {
  const [iAmnt, fnSetAmnt] = useState(0);

  const fnOnAmntChange = (event) => {
    event.preventDefault();
    if (event.target.name === "increment") {
      fnSetAmnt(iAmnt + 1);
    } else {
      if (iAmnt !== 0) {
        fnSetAmnt(iAmnt - 1);
      }
    }
  };
  return (
    <div className="btn-row">
      <button className="spinner-btn" name="decrement" onClick={fnOnAmntChange}>
        -
      </button>
      <p className="spinner-text">{iAmnt}</p>
      <button className="spinner-btn" name="increment" onClick={fnOnAmntChange}>
        +
      </button>
    </div>
  );
}
