import React, { useRef } from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import "./StoriesBar.css";

const StoriesBar = ({
  stories,
  onOpenStory,
  onOpenCreateStory,
}) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -240 : 240;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const userStory = stories.find((s) => s.isCurrentUser);
  const otherStories = stories.filter((s) => !s.isCurrentUser);

  return (
    <div className="stories-bar-container">
      <button
        className="story-scroll-btn left"
        onClick={() => scroll("left")}
        aria-label="Scroll left"
      >
        <ChevronLeft size={18} />
      </button>

      <div className="stories-tray" ref={scrollRef}>
        {/* Current User Story Item */}
        <div className="story-item user-story-item">
          <div
            className={`story-ring-wrapper ${
              userStory?.items?.length > 0
                ? userStory.seen
                  ? "seen-ring"
                  : "active-ring"
                : "no-story-ring"
            }`}
            onClick={() => {
              if (userStory?.items?.length > 0) {
                const userIdx = stories.findIndex((s) => s.isCurrentUser);
                onOpenStory(userIdx);
              } else {
                onOpenCreateStory();
              }
            }}
          >
            <img
              src={
                userStory?.avatar ||
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80"
              }
              alt="Your Story"
              className="story-avatar-img"
            />
            {/* Plus Badge */}
            <button
              className="story-plus-badge"
              onClick={(e) => {
                e.stopPropagation();
                onOpenCreateStory();
              }}
              title="Add Story"
            >
              <Plus size={14} strokeWidth={3} />
            </button>
          </div>
          <span className="story-username-label">Your Story</span>
        </div>

        {/* Other Users' Stories */}
        {otherStories.map((story) => {
          const storyIndex = stories.findIndex((s) => s.id === story.id);
          return (
            <div
              key={story.id}
              className="story-item"
              onClick={() => onOpenStory(storyIndex)}
            >
              <div
                className={`story-ring-wrapper ${
                  story.seen ? "seen-ring" : "active-ring"
                }`}
              >
                <img
                  src={story.avatar}
                  alt={story.username}
                  className="story-avatar-img"
                />
              </div>
              <span className="story-username-label">{story.username}</span>
            </div>
          );
        })}
      </div>

      <button
        className="story-scroll-btn right"
        onClick={() => scroll("right")}
        aria-label="Scroll right"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default StoriesBar;
