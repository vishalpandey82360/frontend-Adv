import React from "react";
import {
  Menu,
  Search,
  Mic,
  Video,
  Bell,
  UserCircle,
} from "lucide-react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="youtube-navbar">

      {/* Left Section */}
      <div className="navbar-left">
        <button className="icon-btn">
          <Menu size={24} />
        </button>

        <div className="youtube-logo">
          <div className="youtube-icon">▶</div>
          <span>YouTube</span>
        </div>
      </div>

      {/* Center Section */}
      <div className="navbar-center">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search"
          />

          <button className="search-btn">
            <Search size={22} />
          </button>
        </div>

        <button className="mic-btn">
          <Mic size={21} />
        </button>
      </div>

      {/* Right Section */}
      <div className="navbar-right">

        <button className="create-btn">
          <Video size={21} />
          <span>Create</span>
        </button>

        <button className="icon-btn notification">
          <Bell size={23} />
          <span className="notification-count">3</span>
        </button>

        <button className="profile-btn">
          <UserCircle size={32} />
        </button>

      </div>
    </nav>
  );
};

export default Navbar;
