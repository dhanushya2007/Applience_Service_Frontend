// src/App.jsx
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./Components/Header";

function App() {
  const [data, setData] = useState([]);
  const [bookings, setBookings] = useState([]); // track bookings

  useEffect(() => {
    fetch("/appliancesData.json")
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <>
      <Header />
      {/* pass both data and setters via context */}
      <Outlet context={{ data, setData, bookings, setBookings }} />
    </>
  );
}

export default App;
