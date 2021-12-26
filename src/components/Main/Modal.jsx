import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Modal() {
  const fnDispatch = useDispatch();
  const bIsModalOpen = useSelector((state) => state.oUserReducer.bIsModalOpen);

  const fnOnClick = (event) => {
    event.preventDefault();
    if (event.target.name === "return") {
      fnDispatch({ type: "SET_MODAL_OPEN" });
    } else {
      fnDispatch({ type: "RESET_STAGE" });
      fnDispatch({ type: "SET_DIRTY", payload: false });
    }
  };
  return (
    <>
      {bIsModalOpen ? (
        <div className="modal-container">
          <div className="modal-content" align="center">
            <h1>Warning!</h1>
            <div className="modal-body">
              <p>
                You have unsaved data. If you continue, all unsaved data will be
                loss
              </p>
            </div>
            <div className="modal-footer">
              <button className="save-btn" name="return" onClick={fnOnClick}>
                Return
              </button>
              <button className="cancel-btn" name="continue">
                Continue
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
