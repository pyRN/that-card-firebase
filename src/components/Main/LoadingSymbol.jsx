import { useSelector } from "react-redux";

export default function LoadingSymbol() {
  const bIsLoading = useSelector((state) => state.oUserReducer.bIsLoading);
  return (
    <>
      {bIsLoading ? (
        <div className="modal-container">
          <div className="modal-content" align="center">
            <h1>Loading</h1>
            <div className="modal-body">
              <div className="loading-symbol"></div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
