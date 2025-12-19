import "./../Styles/home.css";
import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import ApplianceCard from "./ApplianceCard";

const Home = () => {
  const { data } = useOutletContext(); 
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const topServicesIds = [1, 3, 4]; 
  const homeDisplayData = data?.filter(item => topServicesIds.includes(item.id)) || [];
  const filteredData = homeDisplayData.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-overlay">
          <h1>Home Appliance Service System</h1>
          <p>Fast • Affordable • Reliable Repair & Maintenance</p>
          {/* Navigate to Services page instead of scroll */}
          <button className="hero-btn" onClick={() => navigate("/bookinghistory")}>
            Browse Bookings
          </button>
        </div>
      </header>

      <div className="search-section">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="🔍 Search Top Services..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="searchInput"
          />
        </div>
      </div>

      <section className="offers-section">
        <h3>🔥 Special Offers</h3>
        <div className="offers-container">
          <div className="offer-badge">💸 20% OFF on first service</div>
          <div className="offer-badge">🛠️ Weekend Repairs @ ₹499</div>
          <div className="offer-badge">🛡️ 4 Months Warranty</div>
        </div>
      </section>

      <section className="content-section">
        <h3 className="section-title">Top Services</h3>
        <div className="cardContainer">
          {filteredData.length > 0 ? (
            filteredData.map(item => (
              <ApplianceCard key={item.id} item={item} />
            ))
          ) : (
            <p className="no-data">No services found</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
