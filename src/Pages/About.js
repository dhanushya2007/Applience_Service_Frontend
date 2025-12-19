// src/pages/About.jsx
import "./../Styles/About.css";

const About = () => {
  return (
    <div className="aboutPage">
      <h2>About ApplianceHub 🏠⚡</h2>

      <div className="aboutCard">
        <h3>What is ApplianceHub? 🤔</h3>
        <p>
          ApplianceHub is a smart Home Appliance Service System that helps users
          easily find, book, and manage appliance services such as ACs ❄️,
          refrigerators 🥶, washing machines 🧺, and more 🔧.
        </p>
      </div>

      <div className="aboutCard">
        <h3>Why Choose ApplianceHub? 🌟</h3>
        <ul>
          <li>⚡ Easy and fast service booking</li>
          <li>🖥️ Clean and user-friendly interface</li>
          <li>🔒 Secure bookings and tracking</li>
          <li>⚛️ Built using modern React technologies</li>
        </ul>
      </div>

      <div className="aboutCard">
        <h3>Our Goal 🎯</h3>
        <p>
          Our goal is to simplify home appliance servicing by providing a
          reliable, efficient, and easy-to-use platform for everyone 😊.
        </p>
      </div>
    </div>
  );
};

export default About;
