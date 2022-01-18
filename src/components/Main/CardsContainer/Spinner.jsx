export default function Spinner({ oCardInfo, sType }) {
  return (
    <div className="spinner">
      {sType === "Regular" ? "Reg: " : "Foil: "}
      {sType === "Regular"
        ? !oCardInfo.prices.usd
          ? "$0.00"
          : "$" + oCardInfo.prices.usd
        : !oCardInfo.prices.usd_foil
        ? "$0.00"
        : "$" + oCardInfo.prices.usd_foil}
    </div>
  );
}
