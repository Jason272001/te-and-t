import React from "react";
import { AiFillInstagram, AiFillFacebook } from "react-icons/ai";
const Footer = () => {
  return (
    <div className="footer-container">
      <p>2024 Te&T Headphones All rights reserved</p>
      <p className="icons">
        <AiFillFacebook />
        <AiFillInstagram />
      </p>
    </div>
  );
};

export default Footer;
