import React from "react";
import "./footer.css";
const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-links">
          <ul>
            <li>About Us</li>
            <li>Help & Support</li>
            <li>Careers</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
        <div className="footer-social-media">
          <ul>
            <li>Facebook</li>
            <li>Instagram</li>
            <li>Twitter</li>
            <li>LinkedIn</li>
          </ul>
        </div>
        <div className="footer-copyright">
          <p>�� 2023 Flipkart.com, All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
