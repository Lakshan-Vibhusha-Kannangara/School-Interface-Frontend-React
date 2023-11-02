import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const TopNavbar = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const navItemClass = isHovered ? "nav-item active hover-animation" : "nav-item";

  const containerStyle = {
  


  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ opacity: "0.9" }}>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <h4 style={{color:'white',paddingLeft:'40px',paddingTop:'8px'}}>School Interface</h4>
        <ul className="navbar-nav mr-auto mt-2 mr-10 mt-lg-0">
          <li className={navItemClass} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{paddingLeft:'100px',marginLeft:'10px'}}>
            <NavLink className="nav-link" to="/student-register">
              <i className="fa fa-address-card me-1" aria-hidden="true"></i>Register
            </NavLink>
          </li>
          <li className={navItemClass} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <NavLink className="nav-link" to="/classroom">
              <i className="fa fa-archive" aria-hidden="true"></i> Classroom
            </NavLink>
          </li>
          <li className={navItemClass} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <NavLink className="nav-link" to="/teacher-register">
              <i className="fa fa-address-card" aria-hidden="true"></i> Teachers
            </NavLink>
          </li>
          <li className={navItemClass} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <NavLink className="nav-link" to="/subjects">
              <i className="fa fa-subscript me-1" aria-hidden="true"></i> Subjects
            </NavLink>
          </li>
          <li className={navItemClass} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <NavLink className="nav-link" to="/teacher-classroom">
              <i className="fa fa-area-chart me-1" aria-hidden="true"></i> Allocate Class
            </NavLink>
          </li>
          <li className={navItemClass} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <NavLink className="nav-link" to="/subject-teacher">
              <i className="fa fa-bar-chart me-1" aria-hidden="true"></i> Allocate Subject
            </NavLink>
          </li>
          <li className={navItemClass} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <NavLink className="nav-link" to="/student-report">
              <i className="fa fa-bookmark me-1" aria-hidden="true"></i> Student Report
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default TopNavbar;
