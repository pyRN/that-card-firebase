import "./NavBar.css";
export default function CardSearchForm() {
  const fnHandleSubmit = (event) => {
    event.preventDefault();
    let sSearchInput = document.getElementById("searchInput").value;
  };
  return (
    <form className="search-form" onSubmit={fnHandleSubmit}>
      <input
        className=""
        type="search"
        id="searchInput"
        placeholder="Search"
        aria-label="Search"
        style={{ backgroundColor: "#222", color: "green" }}
      />
      <button className="" type="submit" onClick={fnHandleSubmit}>
        Search
      </button>
    </form>
  );
}
