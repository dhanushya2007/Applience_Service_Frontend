import "./../Styles/Services.css";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import { useState } from "react";

const ServiceBooking = () => {
  const { id } = useParams();
  const { data, bookings, setBookings } = useOutletContext(); 
  const navigate = useNavigate();

  const appliance = data.find((item) => item.id === Number(id));

  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");

  if (!appliance) {
    return <h2 style={{ textAlign: "center" }}>Appliance not found</h2>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBooking = {
      id: appliance.id,
      name: appliance.name,
      date,
      address,
      status: "Booked",
    };

    setBookings([...bookings, newBooking]);
    alert(`Service for ${appliance.name} booked successfully!`);
    navigate("/bookinghistory"); 
  };

  return (
    <div className="bookingPage">
      <h2>Book Service for {appliance.name}</h2>
      <img src={appliance.image} alt={appliance.name} className="applianceImage" />
      <p>Price: ₹ {appliance.price}</p>

      <h3>Available Services:</h3>
      <ul>
        {appliance.services?.map((service, index) => (
          <li key={index}>{service}</li>
        ))}
      </ul>

      <form className="bookingForm" onSubmit={handleSubmit}>
        <label>Select Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label>Service Address</label>
        <textarea
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default ServiceBooking;
