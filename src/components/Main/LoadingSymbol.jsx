import { useSelector } from "react-redux";

export default function LoadingSymbol() {
  const bIsLoading = useSelector((state) => state.oUserReducer.bIsLoading);
  return (
    <>
      {bIsLoading ? (
        <div className="responsive-card">
          <h2>Loading</h2>
          <div className="loading-symbol"></div>
        </div>
      ) : null}
    </>
  );
}
