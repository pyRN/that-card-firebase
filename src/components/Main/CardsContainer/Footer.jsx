export default function Footer() {
  return (
    <div className="sticky-bottom footer">
      {/* <div className="btn-container">
        <button className="cancel-btn">Cancel</button>
        <button className="save-btn">Save</button>
      </div> */}
      <select id="select-filter" className="filter-select">
        <option selected value="All">
          All
        </option>
        <option value="High to Low">High to Low</option>
        <option value="Low to High">Low to High</option>
        <option value="White">White</option>
        <option value="Blue">Blue</option>
        <option value="Black">Black</option>
        <option value="Red">Red</option>
        <option value="Green">Green</option>
        <option value="Multicolored">Multicolored</option>
        <option value="Colorless">Colorless</option>
        <option value="Land">Land</option>
      </select>
    </div>
  );
}
