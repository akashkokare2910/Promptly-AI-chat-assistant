import React from "react";
import "../../src/App.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Logo</div>
      <nav>
        <ul className="nav-links">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
