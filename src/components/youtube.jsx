import React, { useState } from "react";
import {
  Menu,
  Search,
  Mic,
  Video,
  Bell,
  PlusCircle,
  Sparkles,
  LogOut,
} from "lucide-react";
import "./Navbar.css";

const Navbar = ({
  userStory,
  hasActiveStories = true,
  onOpenUserStory,
  onOpenCreateStory,
  onSignOut,
}) => {
  const [showCreateDropdown, setShowCreateDropdown] = useState(false);

  const hasUserPostedStory = userStory?.items?.length > 0;
  const isUnseen = hasUserPostedStory && !userStory?.seen;

  return (
    <nav className="youtube-navbar">
      {/* Left Section */}
      <div className="navbar-left">
        <button className="icon-btn" aria-label="Menu">
          <Menu size={22} />
        </button>

        <div className="youtube-logo">
          <div className="youtube-icon">▶</div>
          <span className="logo-title">YouTube</span>
          <span className="story-badge-live">Stories</span>
        </div>
      </div>

      {/* Center Section */}
      <div className="navbar-center">
        <div className="search-box">
          <input type="text" placeholder="Search" aria-label="Search query" />
          <button className="search-btn" aria-label="Submit search">
            <Search size={20} />
          </button>
        </div>

        <button className="mic-btn" aria-label="Voice Search">
          <Mic size={20} />
        </button>
      </div>

      {/* Right Section */}
      <div className="navbar-right">
        {/* Create / Post Story Button */}
        <div className="create-menu-wrapper">
          <button
            className="create-btn"
            onClick={() => setShowCreateDropdown(!showCreateDropdown)}
            title="Create"
          >
            <Video size={18} />
            <span>Create</span>
          </button>

          {showCreateDropdown && (
            <div className="create-dropdown-menu">
              <button
                className="dropdown-item story-item-highlight"
                onClick={() => {
                  setShowCreateDropdown(false);
                  onOpenCreateStory();
                }}
              >
                <div className="dropdown-icon-glow">
                  <Sparkles size={16} />
                </div>
                <div>
                  <strong>Post a Story</strong>
                  <p>Share photos & updates with followers</p>
                </div>
              </button>

              <button
                className="dropdown-item"
                onClick={() => setShowCreateDropdown(false)}
              >
                <Video size={16} />
                <div>
                  <strong>Upload video</strong>
                  <p>Publish video to channel</p>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Quick Post Story Button */}
        <button
          className="quick-story-btn"
          onClick={onOpenCreateStory}
          title="Post Story"
        >
          <PlusCircle size={18} />
          <span>+ Story</span>
        </button>

        {/* Notifications */}
        <button className="icon-btn notification" aria-label="Notifications">
          <Bell size={21} />
          <span className="notification-count">3</span>
        </button>

        <button className="icon-btn" onClick={onSignOut} aria-label="Sign out" title="Sign out">
          <LogOut size={19} />
        </button>

        {/* Profile Avatar with Instagram Story Ring */}
        <div className="profile-story-container">
          <div
            className={`navbar-story-ring ${
              hasUserPostedStory
                ? isUnseen
                  ? "ring-unseen"
                  : "ring-seen"
                : "ring-idle"
            }`}
            onClick={() => {
              if (hasUserPostedStory) {
                onOpenUserStory();
              } else {
                onOpenCreateStory();
              }
            }}
            title={
              hasUserPostedStory
                ? isUnseen
                  ? "View your new Story!"
                  : "View your Story"
                : "Post your Story"
            }
          >
            <img
              src={
                userStory?.avatar ||
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80"
              }
              alt="Profile"
              className="navbar-profile-img"
            />
            {isUnseen && <span className="story-pulse-dot" />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
