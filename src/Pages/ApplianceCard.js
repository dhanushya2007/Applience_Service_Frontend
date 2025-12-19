// src/Pages/ApplianceCard.jsx
import { useNavigate } from "react-router-dom";
import "./../Styles/ApplianceCard.css";

const ApplianceCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div className="applianceCard">
      <img src={item.image} alt={item.name} className="applianceImage" />
      <h3>{item.name}</h3>
      <p>₹ {item.price}</p>

      <button onClick={() => navigate(`/services/${item.id}`)}>
        View Service
      </button>
    </div>
  );
};

export default ApplianceCard;
