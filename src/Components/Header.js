import { NavLink, useNavigate } from "react-router-dom";
import "../Styles/header.css";

const Header = () => {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("authToken"); // check login status

  const logoutHandler = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("token"); // if using JWT
    navigate("/login"); // redirect to login page
  };

  return (
    <header className="header">
      <div className="logo">
        <img
          src="https://www.shutterstock.com/image-vector/modern-minimalist-home-appliance-store-260nw-2202063039.jpg"
          alt="Appliance Service Logo"
        />
        
      </div>

      <div className="links">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/product"}>Product</NavLink>
        <NavLink to={"/bookinghistory"}>Bookings</NavLink>
        <NavLink to={"/addAppliance"}>Add Appliance</NavLink>
        <NavLink to={"/services"}>Services</NavLink>
        <NavLink to={"/about"}>About</NavLink>
        <NavLink to={"/contact"}>Contact</NavLink>

        {/* Conditionally show Login or Logout */}
        {isAuth ? (
          <button
            onClick={logoutHandler}
            style={{ marginLeft: "10px", padding: "5px 10px", cursor: "pointer" }}
          >
            Logout
          </button>
        ) : (
          <NavLink to={"/login"}>Login</NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
