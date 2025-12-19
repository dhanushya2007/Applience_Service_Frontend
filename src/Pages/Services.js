import "./../Styles/Services.css";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import { useState } from "react";

const Services = () => {
  const { id } = useParams();
  const { data } = useOutletContext();
  const navigate = useNavigate();

  const appliance = data.find((item) => item.id === Number(id));

  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [serviceType, setServiceType] = useState("Repair");
  const [timeSlot, setTimeSlot] = useState("Morning");

  const serviceCosts = {
    Repair: 500,
    Installation: 800,
    Maintenance: 300,
  };
  const estimatedCost = serviceCosts[serviceType];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBooking = {
      customerName,
      email,
      applianceName: appliance.name,
      image: appliance.image,
      date,
      address,
      serviceType,
      timeSlot,
      cost: estimatedCost,
      status: "Pending",
    };

    try {
      const response = await fetch("http://localhost:9000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBooking),
      });

      const result = await response.json();
      console.log("Backend response:", result);

      if (response.status === 201) {
        alert(result.message); // "Booking saved successfully"
        navigate("/bookinghistory");
      } else if (response.status === 409) {
        alert(result.message); // "Booking already exists..."
      } else {
        alert("Failed to book service: " + result.message);
      }
    } catch (error) {
      console.error("Error booking service:", error);
      alert("Error connecting to server");
    }
  };

  if (!appliance) {
    return <h2 style={{ textAlign: "center" }}>Appliance not found</h2>;
  }

  return (
    <div className="bookingPage">
      <h2>Book Service for {appliance.name}</h2>
      <img
        src={appliance.image}
        alt={appliance.name}
        className="applianceImage"
        style={{ maxWidth: "300px", display: "block", margin: "20px auto" }}
      />

      <p>Price: ₹ {appliance.price}</p>

      <h3>Available Services:</h3>
      <ul>
        {appliance.services?.map((service, index) => (
          <li key={index}>{service}</li>
        ))}
      </ul>

      <form className="bookingForm" onSubmit={handleSubmit}>
        <label>Your Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Service Type</label>
        <select value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
          <option value="Repair">Repair</option>
          <option value="Installation">Installation</option>
          <option value="Maintenance">Maintenance</option>
        </select>

        <label>Preferred Time Slot</label>
        <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Evening">Evening</option>
        </select>

        <label>Select Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

        <label>Service Address</label>
        <textarea
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <p className="costPreview">Estimated Cost: ₹ {estimatedCost}</p>

        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default Services;


