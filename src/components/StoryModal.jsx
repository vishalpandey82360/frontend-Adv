import React, { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Heart, Send, Trash2, Volume2, VolumeX } from "lucide-react";
import "./StoryModal.css";

const DURATION = 4500; // ms per story item

const StoryModal = ({
  stories,
  initialUserIndex = 0,
  onClose,
  onDeleteStoryItem,
  onStorySeen,
}) => {
  const [currentUserIndex, setCurrentUserIndex] = useState(initialUserIndex);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [liked, setLiked] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showReplySent, setShowReplySent] = useState(false);

  const timerRef = useRef(null);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);
  const remainingTimeRef = useRef(DURATION);

  const currentUser = stories[currentUserIndex];
  const currentItems = currentUser ? currentUser.items : [];
  const currentItem = currentItems[currentItemIndex];

  const clearAllTimers = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const markSeen = (userIndex) => {
    if (onStorySeen && stories[userIndex]) {
      onStorySeen(stories[userIndex].id);
    }
  };

  const handleNext = () => {
    clearAllTimers();
    setLiked(false);
    if (!currentUser) return;

    if (currentItemIndex < currentItems.length - 1) {
      setCurrentItemIndex((prev) => prev + 1);
      setProgress(0);
      remainingTimeRef.current = DURATION;
    } else if (currentUserIndex < stories.length - 1) {
      const nextUserIdx = currentUserIndex + 1;
      markSeen(nextUserIdx);
      setCurrentUserIndex(nextUserIdx);
      setCurrentItemIndex(0);
      setProgress(0);
      remainingTimeRef.current = DURATION;
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    clearAllTimers();
    setLiked(false);
    if (currentItemIndex > 0) {
      setCurrentItemIndex((prev) => prev - 1);
      setProgress(0);
      remainingTimeRef.current = DURATION;
    } else if (currentUserIndex > 0) {
      const prevUserIdx = currentUserIndex - 1;
      const prevItems = stories[prevUserIdx].items;
      setCurrentUserIndex(prevUserIdx);
      setCurrentItemIndex(prevItems.length - 1);
      setProgress(0);
      remainingTimeRef.current = DURATION;
    } else {
      setProgress(0);
      startTimer(DURATION);
    }
  };

  const startTimer = (duration) => {
    clearAllTimers();
    startTimeRef.current = Date.now();
    remainingTimeRef.current = duration;

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
    }, 20);

    timerRef.current = setTimeout(() => {
      handleNext();
    }, duration);
  };

  useEffect(() => {
    markSeen(currentUserIndex);
  }, [currentUserIndex]);

  useEffect(() => {
    if (!isPaused && currentItem) {
      startTimer(remainingTimeRef.current || DURATION);
    }
    return () => clearAllTimers();
  }, [currentUserIndex, currentItemIndex, isPaused]);

  const handlePause = () => {
    setIsPaused(true);
    clearAllTimers();
    const elapsed = Date.now() - startTimeRef.current;
    remainingTimeRef.current = Math.max(DURATION - elapsed, 200);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setShowReplySent(true);
    setReplyText("");
    setTimeout(() => setShowReplySent(false), 2000);
  };

  const handleDeleteCurrent = () => {
    if (onDeleteStoryItem && currentUser?.isCurrentUser) {
      onDeleteStoryItem(currentUser.id, currentItem.id);
      if (currentItems.length <= 1) {
        onClose();
      } else {
        handleNext();
      }
    }
  };

  if (!currentUser || !currentItem) {
    return null;
  }

  return (
    <div className="story-modal-backdrop" onClick={onClose}>
      {/* Previous User Button */}
      {currentUserIndex > 0 && (
        <button
          className="story-nav-btn prev-btn"
          onClick={(e) => {
            e.stopPropagation();
            clearAllTimers();
            setCurrentUserIndex((prev) => prev - 1);
            setCurrentItemIndex(0);
            setProgress(0);
          }}
          aria-label="Previous story"
        >
          <ChevronLeft size={30} />
        </button>
      )}

      {/* Story Card */}
      <div
        className="story-card"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handlePause}
        onMouseUp={handleResume}
        onTouchStart={handlePause}
        onTouchEnd={handleResume}
      >
        {/* Top Progress Bars */}
        <div className="story-progress-container">
          {currentItems.map((_, idx) => (
            <div key={idx} className="story-progress-track">
              <div
                className="story-progress-fill"
                style={{
                  width:
                    idx < currentItemIndex
                      ? "100%"
                      : idx === currentItemIndex
                      ? `${progress}%`
                      : "0%",
                }}
              />
            </div>
          ))}
        </div>

        {/* Story Header */}
        <div className="story-header">
          <div className="story-user-info">
            <div className="story-avatar-small-ring">
              <img
                src={currentUser.avatar}
                alt={currentUser.username}
                className="story-header-avatar"
              />
            </div>
            <div className="story-header-meta">
              <span className="story-header-username">
                {currentUser.username}
                {currentUser.isCurrentUser && " (You)"}
              </span>
              <span className="story-header-time">
                {currentItem.timestamp || "Just now"}
              </span>
            </div>
          </div>

          <div className="story-header-actions">
            {currentUser.isCurrentUser && (
              <button
                className="story-icon-btn delete-btn"
                onClick={handleDeleteCurrent}
                title="Delete story"
              >
                <Trash2 size={18} />
              </button>
            )}
            <button
              className="story-icon-btn close-btn"
              onClick={onClose}
              title="Close"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Story Media */}
        <div className="story-media-wrapper">
          {currentItem.type === "video" ? (
            <video
              src={currentItem.url}
              autoPlay
              playsInline
              muted
              className="story-media"
            />
          ) : (
            <img
              src={currentItem.url}
              alt={currentItem.caption || "Story"}
              className="story-media"
            />
          )}

          {currentItem.caption && (
            <div className="story-caption-overlay">
              <p>{currentItem.caption}</p>
            </div>
          )}
        </div>

        {/* Tap Overlays for Navigation */}
        <div
          className="story-tap-zone story-tap-left"
          onClick={handlePrev}
          title="Previous"
        />
        <div
          className="story-tap-zone story-tap-right"
          onClick={handleNext}
          title="Next"
        />

        {/* Footer Reactions / Reply */}
        <div className="story-footer">
          {showReplySent ? (
            <div className="reply-sent-toast">Reply sent! ✈️</div>
          ) : (
            <form className="story-reply-form" onSubmit={handleSendReply}>
              <input
                type="text"
                placeholder={`Reply to ${currentUser.username}...`}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onFocus={handlePause}
                onBlur={handleResume}
              />
              {replyText.trim() ? (
                <button type="submit" className="story-send-btn">
                  <Send size={18} />
                </button>
              ) : (
                <button
                  type="button"
                  className={`story-like-btn ${liked ? "liked" : ""}`}
                  onClick={() => setLiked(!liked)}
                >
                  <Heart size={22} fill={liked ? "#ff2a55" : "none"} color={liked ? "#ff2a55" : "#ffffff"} />
                </button>
              )}
            </form>
          )}
        </div>
      </div>

      {/* Next User Button */}
      {currentUserIndex < stories.length - 1 && (
        <button
          className="story-nav-btn next-btn"
          onClick={(e) => {
            e.stopPropagation();
            clearAllTimers();
            setCurrentUserIndex((prev) => prev + 1);
            setCurrentItemIndex(0);
            setProgress(0);
          }}
          aria-label="Next story"
        >
          <ChevronRight size={30} />
        </button>
      )}
    </div>
  );
};

export default StoryModal;
