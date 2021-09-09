export default function CardSearchForm() {
  const fnHandleSubmit = (event) => {
    event.preventDefault();
    let sSearchInput = document.getElementById("searchInput").value;
  };
  return (
    <form className="search-form" onSubmit={fnHandleSubmit}>
      <input
        className="search-input"
        type="search"
        id="searchInput"
        placeholder="Search"
        aria-label="Search"
      />
      <button className="search-btn" type="submit" onClick={fnHandleSubmit}>
        Search
      </button>
    </form>
  );
}
