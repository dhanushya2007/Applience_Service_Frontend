import "./../Styles/BookingHistory.css";
import { useEffect, useState } from "react";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [search, setSearch] = useState(""); // new search state

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("http://localhost:9000/api/bookings");
        const data = await res.json();
        setBookings(data.data.bookings);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };
    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:9000/api/bookings/${id}`, {
        method: "DELETE",
      });
      if (res.status === 204) {
        alert("Booking deleted successfully");
        setBookings((prev) => prev.filter((b) => b._id !== id));
      }
    } catch (err) {
      console.error("Error deleting booking:", err);
    }
  };

  const startEdit = (booking) => {
    setEditingId(booking._id);
    setEditData({ ...booking });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    try {
      const res = await fetch(`http://localhost:9000/api/bookings/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      if (res.status === 200) {
        alert("Booking updated successfully");
        setBookings((prev) =>
          prev.map((b) => (b._id === editingId ? { ...b, ...editData } : b))
        );
        setEditingId(null);
      }
    } catch (err) {
      console.error("Error updating booking:", err);
    }
  };
  const filteredBookings = bookings.filter((b) =>
    b.applianceName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bookingHistoryPage">
      <h2>Your Booking History</h2>
      <div className="searchBar">
        <input
          type="text"
          placeholder="🔍 Search by appliance name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredBookings.length > 0 ? (
        <div className="cardGrid">
          {filteredBookings.map((b) => (
            <div key={b._id} className="bookingCardWrapper">
              {/* Original card */}
              <div className="bookingCard horizontalCard">
                <img src={b.image} alt={b.applianceName} className="bookingImage" />
                <div className="bookingDetails">
                  <div><strong>Name:</strong> {b.customerName}</div>
                  <div><strong>Email:</strong> {b.email}</div>
                  <div><strong>Appliance:</strong> {b.applianceName}</div>
                  <div><strong>Date:</strong> {b.date}</div>
                  <div><strong>Address:</strong> {b.address}</div>
                  <div><strong>Service Type:</strong> {b.serviceType}</div>
                  <div><strong>Time Slot:</strong> {b.timeSlot}</div>
                  <div><strong>Cost:</strong> ₹{b.cost}</div>
                  <div className={`bookingStatus ${b.status.toLowerCase()}`}>
                    {b.status}
                  </div>
                  <div className="bookingActions">
                    <button onClick={() => startEdit(b)}>Update</button>
                    <button onClick={() => handleDelete(b._id)}>Delete</button>
                  </div>
                </div>
              </div>

              {/* Separate horizontal edit form */}
              {editingId === b._id && (
                <div className="editForm horizontalForm">
                  <label>Name</label>
                  <input
                    name="customerName"
                    value={editData.customerName}
                    onChange={handleEditChange}
                  />

                  <label>Email</label>
                  <input
                    name="email"
                    value={editData.email}
                    onChange={handleEditChange}
                  />

                  <label>Date</label>
                  <input
                    type="date"
                    name="date"
                    value={editData.date}
                    onChange={handleEditChange}
                  />

                  <label>Address</label>
                  <textarea
                    name="address"
                    value={editData.address}
                    onChange={handleEditChange}
                  />

                  <label>Status</label>
                  <select
                    name="status"
                    value={editData.status}
                    onChange={handleEditChange}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>

                  <div className="editActions">
                    <button onClick={saveEdit}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default BookingHistory;
