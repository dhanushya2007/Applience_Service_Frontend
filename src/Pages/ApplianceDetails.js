import "./../Styles/ApplianceDetails.css";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";

const ApplianceDetails = () => {
  const { id } = useParams();
  const { data } = useOutletContext();
  const navigate = useNavigate();

  const appliance = data.find(
    (item) => item.id === Number(id)
  );

  if (!appliance) {
    return <h2 style={{ textAlign: "center" }}>Appliance not found</h2>;
  }

  return (
    <div className="detailsPage">
      <div className="detailsCard">
        <img src={appliance.image} alt={appliance.name} />
        <div className="detailsContent">
          <h2>{appliance.name}</h2>
          <p>{appliance.description}</p>
          <h3>Service Price: ₹ {appliance.price}</h3>

          <button
            onClick={() => navigate(`/booking/${appliance.id}`)}
          >
            Book Service
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplianceDetails;
