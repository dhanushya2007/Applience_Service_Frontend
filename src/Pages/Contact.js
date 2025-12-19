// src/Pages/Contact.jsx
import "./../Styles/Contact.css";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for contacting us!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contactPage">
      {/* Hero-style header */}
      <section className="contactHero">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you! Fill out the form below.</p>
      </section>

      {/* Contact Form */}
      <form className="contactForm" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Message:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="ctaButton">Send Message</button>
      </form>

      {/* Extra info */}
      <div className="contactInfo">
        <h3>Other ways to reach us:</h3>
        <p>Email: support@applianceservice.com</p>
        <p>Phone: +91 98765 43210</p>
        <p>Address: 123 Service Street, Pollachi, TN</p>
      </div>
    </div>
  );
};

export default Contact;
