import React, { useState, useEffect, useRef } from 'react';
import './InstaFeed.css';
import React from 'react'

const insta1 = () => {
  return (
    <div>
      
    </div>
  )
}

export default insta1

const storiesData = [
  {
    id: 1,
    username: "alex_travels",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    seen: false,
    items: [
      { type: "image", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80" },
      { type: "image", url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&auto=format&fit=crop&q=80" }
    ]
  },
  {
    id: 2,
    username: "urban_designs",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    seen: false,
    items: [
      { type: "image", url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80" }
    ]
  },
  {
    id: 3,
    username: "chef_maria",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    seen: false,
    items: [
      { type: "image", url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80" }
    ]
  }
];

const videoPosts = [
  {
    id: 101,
    username: "wanderlust_media",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    caption: "Sunset views from the coastline 🌅🌊 #travel #reels"
  }
];

const DURATION = 4000;

export default function InstaFeed() {
  const [stories, setStories] = useState(storiesData);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const timerRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const startTimeRef = useRef(0);
  const remainingTimeRef = useRef(DURATION);

  const openStory = (index) => {
    setCurrentStoryIndex(index);
    setCurrentItemIndex(0);
    setProgress(0);
    setModalOpen(true);

    const updated = [...stories];
    updated[index].seen = true;
    setStories(updated);
  };

  const closeStory = () => {
    clearTimers();
    setModalOpen(false);
    setProgress(0);
  };

  const clearTimers = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
  };

  const nextStory = () => {
    clearTimers();
    const currentUser = stories[currentStoryIndex];
    if (currentItemIndex < currentUser.items.length - 1) {
      setCurrentItemIndex((prev) => prev + 1);
      setProgress(0);
    } else if (currentStoryIndex < stories.length - 1) {
      const nextUserIdx = currentStoryIndex + 1;
      const updated = [...stories];
      updated[nextUserIdx].seen = true;
      setStories(updated);
      setCurrentStoryIndex(nextUserIdx);
      setCurrentItemIndex(0);
      setProgress(0);
    } else {
      closeStory();
    }
  };

  const prevStory = () => {
    clearTimers();
    if (currentItemIndex > 0) {
      setCurrentItemIndex((prev) => prev - 1);
      setProgress(0);
    } else if (currentStoryIndex > 0) {
      const prevUserIdx = currentStoryIndex - 1;
      setCurrentStoryIndex(prevUserIdx);
      setCurrentItemIndex(stories[prevUserIdx].items.length - 1);
      setProgress(0);
    } else {
      setProgress(0);
      startTimer(DURATION);
    }
  };

  const startTimer = (duration) => {
    clearTimers();
    startTimeRef.current = Date.now();
    remainingTimeRef.current = duration;

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
    }, 16);

    timerRef.current = setTimeout(() => {
      nextStory();
    }, duration);
  };

  useEffect(() => {
    if (modalOpen && !isPaused) {
      startTimer(remainingTimeRef.current || DURATION);
    }
    return () => clearTimers();
  }, [modalOpen, currentStoryIndex, currentItemIndex, isPaused]);

  const handlePause = () => {
    setIsPaused(true);
    clearTimers();
    const currentPercent = progress;
    remainingTimeRef.current = DURATION * ((100 - currentPercent) / 100);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const currentUser = stories[currentStoryIndex];
  const currentItem = currentUser?.items[currentItemIndex];

  return (
    <div className="insta-container">
      {/* App Header */}
      <header className="app-header">
        <h1 className="logo">Instagram</h1>
        <div className="header-icons">
          <button aria-label="Notifications">❤️</button>
          <button aria-label="Direct Messages">💬</button>
        </div>
      </header>

      {/* Stories Bar */}
      <section className="stories-bar">
        {stories.map((user, idx) => (
          <div key={user.id} className="story-avatar-wrapper" onClick={() => openStory(idx)}>
            <div className={`avatar-ring ${user.seen ? 'seen' : ''}`}>
              <img src={user.avatar} alt={user.username} />
            </div>
            <span className="story-username">{user.username}</span>
          </div>
        ))}
      </section>

      {/* Video Feed */}
      <main className="video-feed">
        {videoPosts.map((post) => (
          <article key={post.id} className="video-card">
            <div className="video-card-header">
              <img src={post.avatar} className="avatar-small" alt={post.username} />
              <span className="username">{post.username}</span>
            </div>
            <div className="video-wrapper">
              <video src={post.videoUrl} controls playsInline loop preload="metadata" />
            </div>
            <p className="video-caption">
              <strong>{post.username}</strong> {post.caption}
            </p>
          </article>
        ))}
      </main>

      {/* Fullscreen Story Modal */}
      {modalOpen && (
        <div className="story-modal active">
          <div
            className="story-card"
            onMouseDown={handlePause}
            onMouseUp={handleResume}
            onTouchStart={handlePause}
            onTouchEnd={handleResume}
          >
            {/* Progress Bars */}
            <div className="progress-bar-container">
              {currentUser.items.map((_, idx) => (
                <div key={idx} className="progress-segment">
                  <div
                    className="progress-fill"
                    style={{
                      width: idx < currentItemIndex ? '100%' : idx === currentItemIndex ? `${progress}%` : '0%'
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Story Header */}
            <div className="story-user-header">
              <img src={currentUser.avatar} alt={currentUser.username} className="avatar-small" />
              <span className="username">{currentUser.username}</span>
              <button className="close-btn" onClick={closeStory}>&times;</button>
            </div>

            {/* Story Media */}
            <div className="story-media-container">
              <img src={currentItem.url} alt="Story Media" />
            </div>

            {/* Tap Navigation Overlays */}
            <div className="tap-zone tap-left" onClick={(e) => { e.stopPropagation(); prevStory(); }} />
            <div className="tap-zone tap-right" onClick={(e) => { e.stopPropagation(); nextStory(); }} />
          </div>
        </div>
      )}
    </div>
  );
}
