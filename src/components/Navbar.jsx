import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

const navItems = [
  { label: "Home", path: "/home" },
  { label: "Timeline", path: "/timeline" },
  { label: "Quiz", path: "/quiz" },
  { label: "Simulator", path: "/simulator" },
  { label: "Compare", path: "/compare" },
  { label: "Deposits", path: "/deposits" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="nav-container">
      {/* Left Logo */}
      <div className="nav-left">
        <NavLink to="/home" className="nav-logo">
          U3O8Flow
        </NavLink>
      </div>

      {/* Desktop Nav Links */}
      <nav className="nav-links">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `seg-button ${isActive ? "active" : ""}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Right CTA & Mobile Toggle */}
      <div className="nav-right">
        <NavLink to="/simulator">
          <button className="cta-button">Launch Simulator</button>
        </NavLink>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="mobile-drawer">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `mobile-link ${isActive ? "active" : ""}`
              }
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink to="/simulator" onClick={() => setMenuOpen(false)}>
            <button className="mobile-cta">Launch Simulator</button>
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Navbar;
