import { useSelector } from "react-redux";

export default function LoadingSymbol() {
  const bIsLoading = useSelector((state) => state.oUserReducer.bIsLoading);
  return (
    <>
      {bIsLoading ? (
        <div className="responsive-card">
          <div class="loading-symbol"></div>
        </div>
      ) : null}
    </>
  );
}
