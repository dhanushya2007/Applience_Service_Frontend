import "./../Styles/Product.css";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import ApplianceCard from "./ApplianceCard";

const Products = () => {
  const { data } = useOutletContext();
  const [search, setSearch] = useState("");

  const filteredData = data?.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <div className="products-container">
      <div className="search-only-top">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="🔍 Search for any appliance..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="searchInput"
          />
        </div>
      </div>

      <section className="content-section">
        <div className="cardContainer">
          {filteredData.length > 0 ? (
            filteredData.map(item => (
              <ApplianceCard key={item.id} item={item} />
            ))
          ) : (
            <div className="no-data">
              <p>No appliances found matching "{search}"</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;