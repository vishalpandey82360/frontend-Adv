import React, { useState } from "react";
import Navbar from "./components/youtube";
import StoriesBar from "./components/StoriesBar";
import StoryModal from "./components/StoryModal";
import PostStoryModal from "./components/PostStoryModal";
import Footer from "./components/Footer";
import ProductGrid from "./components/card";
import HistorySidebar from "./components/HistorySidebar";
import AuthPage from "./components/AuthPage";
import { Play, Eye, ThumbsUp, MessageSquare, Share2 } from "lucide-react";
import "./App.css";

const INITIAL_STORIES = [
  {
    id: "user-me",
    username: "Your Story",
    isCurrentUser: true,
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
    seen: false,
    items: [
      {
        id: "item-me-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
        caption: "Late night building cool features on YouTube Clone! 💻🔥",
        timestamp: "Just now",
      },
    ],
  },
  {
    id: "user-1",
    username: "alex_tech",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    seen: false,
    items: [
      {
        id: "item-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
        caption: "Tropical vibes from vacation 🏖️🌊",
        timestamp: "1h ago",
      },
      {
        id: "item-2",
        type: "image",
        url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&auto=format&fit=crop&q=80",
        caption: "Sunset cocktail by the ocean 🍹🌅",
        timestamp: "45m ago",
      },
    ],
  },
  {
    id: "user-2",
    username: "studio_designs",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    seen: false,
    items: [
      {
        id: "item-3",
        type: "image",
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80",
        caption: "Architecture tour in Tokyo 🏙️✨",
        timestamp: "2h ago",
      },
    ],
  },
  {
    id: "user-3",
    username: "chef_maria",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    seen: false,
    items: [
      {
        id: "item-4",
        type: "image",
        url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
        caption: "Handmade artisan pasta from scratch! 🍝",
        timestamp: "4h ago",
      },
    ],
  },
  {
    id: "user-4",
    username: "gaming_zone",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=120&auto=format&fit=crop&q=80",
    seen: false,
    items: [
      {
        id: "item-5",
        type: "image",
        url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80",
        caption: "Live esports tournament setup 🎮🏆",
        timestamp: "6h ago",
      },
    ],
  },
];

const SAMPLE_VIDEOS = [
  {
    id: "v1",
    title: "Building Fullstack React 19 & Vite Web Applications from Scratch",
    channel: "alex_tech",
    channelAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    views: "245K views",
    timestamp: "1 day ago",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80",
    duration: "18:42",
    hasStory: true,
  },
  {
    id: "v2",
    title: "Modern Minimalist Interior Design Tour - Tokyo Apartment",
    channel: "studio_designs",
    channelAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    views: "1.2M views",
    timestamp: "3 days ago",
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    duration: "12:15",
    hasStory: true,
  },
  {
    id: "v3",
    title: "Mastering Italian Carbonara: Real Secrets from Rome Chefs",
    channel: "chef_maria",
    channelAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    views: "890K views",
    timestamp: "5 days ago",
    thumbnail: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&auto=format&fit=crop&q=80",
    duration: "09:30",
    hasStory: true,
  },
  {
    id: "v4",
    title: "Pro Esports Finals 2026: Insane Clutch Highlights!",
    channel: "gaming_zone",
    channelAvatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=120&auto=format&fit=crop&q=80",
    views: "4.5M views",
    timestamp: "1 week ago",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80",
    duration: "24:10",
    hasStory: true,
  },
];

const CATEGORIES = ["All", "React", "Tech", "Design", "Gaming", "Cooking", "Live", "Podcasts", "Music"];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("youtube-stories-authenticated") === "true"
  );
  const [stories, setStories] = useState(INITIAL_STORIES);
  const [activeStoryUserIndex, setActiveStoryUserIndex] = useState(null);
  const [isPostStoryOpen, setIsPostStoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const userStory = stories.find((s) => s.isCurrentUser);

  const handleOpenStory = (userIndex) => {
    setActiveStoryUserIndex(userIndex);
  };

  const handleOpenUserStory = () => {
    const userIndex = stories.findIndex((s) => s.isCurrentUser);
    if (userIndex !== -1 && stories[userIndex]?.items?.length > 0) {
      setActiveStoryUserIndex(userIndex);
    } else {
      setIsPostStoryOpen(true);
    }
  };

  const handleAddStory = (newStoryItem) => {
    const item = {
      id: "item-" + Date.now(),
      type: newStoryItem.type || "image",
      url: newStoryItem.url,
      caption: newStoryItem.caption,
      timestamp: "Just now",
    };

    setStories((prev) =>
      prev.map((story) => {
        if (story.isCurrentUser) {
          return {
            ...story,
            seen: false,
            items: [item, ...(story.items || [])],
          };
        }
        return story;
      })
    );
  };

  const handleDeleteStoryItem = (userId, itemId) => {
    setStories((prev) =>
      prev.map((story) => {
        if (story.id === userId) {
          return {
            ...story,
            items: story.items.filter((item) => item.id !== itemId),
          };
        }
        return story;
      })
    );
  };

  const handleStorySeen = (storyId) => {
    setStories((prev) =>
      prev.map((story) => {
        if (story.id === storyId) {
          return { ...story, seen: true };
        }
        return story;
      })
    );
  };

  if (!isAuthenticated) {
    return <AuthPage onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  const handleSignOut = () => {
    localStorage.removeItem("youtube-stories-authenticated");
    setIsAuthenticated(false);
  };

  return (
    <div className="app-root">
      {/* Top Navbar with Profile Story Ring Indicator */}
      <Navbar
        userStory={userStory}
        onOpenUserStory={handleOpenUserStory}
        onOpenCreateStory={() => setIsPostStoryOpen(true)}
        onSignOut={handleSignOut}
      />

      {/* Instagram Story Tray at Top */}
      <StoriesBar
        stories={stories}
        onOpenStory={handleOpenStory}
        onOpenCreateStory={() => setIsPostStoryOpen(true)}
      />

      {/* Main Content Area */}
      <main className="main-content">
        <div className="content-shell">
          <HistorySidebar />
          <div className="content-main">
            <ProductGrid />

            {/* Category Pills Bar */}
            <div className="category-pills">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`pill-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

            {/* Video Cards Grid */}
            <div className="video-grid">
              {SAMPLE_VIDEOS.map((video) => {
                const channelStoryIndex = stories.findIndex(
                  (s) => s.username === video.channel
                );
                const channelHasActiveStory = channelStoryIndex !== -1;
                const channelStorySeen =
                  channelHasActiveStory && stories[channelStoryIndex]?.seen;

                return (
                  <div key={video.id} className="video-card">
                    <div className="thumbnail-wrapper">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="video-thumbnail"
                      />
                      <span className="duration-badge">{video.duration}</span>
                    </div>

                    <div className="video-info">
                      {/* Channel Avatar with Story Ring */}
                      <div
                        className={`channel-story-ring ${
                          channelHasActiveStory
                            ? channelStorySeen
                              ? "ring-seen"
                              : "ring-active"
                            : ""
                        }`}
                        onClick={() => {
                          if (channelHasActiveStory) {
                            handleOpenStory(channelStoryIndex);
                          }
                        }}
                        title={
                          channelHasActiveStory
                            ? "Click to view " + video.channel + "'s Story"
                            : video.channel
                        }
                      >
                        <img
                          src={video.channelAvatar}
                          alt={video.channel}
                          className="channel-avatar"
                        />
                      </div>

                      <div className="video-details">
                        <h3 className="video-title">{video.title}</h3>
                        <div className="channel-meta">
                          <span className="channel-name">{video.channel}</span>
                          {channelHasActiveStory && !channelStorySeen && (
                            <span className="story-chip">Story</span>
                          )}
                        </div>
                        <p className="video-stats">
                          {video.views} • {video.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Story Viewer Modal */}
      {activeStoryUserIndex !== null && (
        <StoryModal
          stories={stories}
          initialUserIndex={activeStoryUserIndex}
          onClose={() => setActiveStoryUserIndex(null)}
          onDeleteStoryItem={handleDeleteStoryItem}
          onStorySeen={handleStorySeen}
        />
      )}

      {/* Post Story Modal */}
      <PostStoryModal
        isOpen={isPostStoryOpen}
        onClose={() => setIsPostStoryOpen(false)}
        onAddStory={handleAddStory}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
