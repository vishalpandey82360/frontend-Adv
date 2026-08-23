import React, { useState } from "react";
import { X, Image, Sparkles, Upload } from "lucide-react";
import "./PostStoryModal.css";

const PRESET_STORIES = [
  {
    name: "Coding Stream",
    url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    caption: "Late night coding session 💻✨ #youtube #dev",
  },
  {
    name: "Sunset View",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    caption: "Chasing golden hour 🌅✨",
  },
  {
    name: "Studio Setup",
    url: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80",
    caption: "Recording next YouTube video today! 🎙️🎥",
  },
  {
    name: "Travel Vibes",
    url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop&q=80",
    caption: "Bonjour Paris! 🥐🇫🇷",
  },
];

const PostStoryModal = ({ isOpen, onClose, onAddStory }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [selectedPreset, setSelectedPreset] = useState(0);

  if (!isOpen) return null;

  const currentPreviewUrl = imageUrl.trim() || PRESET_STORIES[selectedPreset].url;

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalUrl = imageUrl.trim() || PRESET_STORIES[selectedPreset].url;
    const finalCaption = caption.trim() || PRESET_STORIES[selectedPreset].caption;

    onAddStory({
      url: finalUrl,
      caption: finalCaption,
      type: "image",
    });

    setImageUrl("");
    setCaption("");
    onClose();
  };

  const handleSelectPreset = (idx) => {
    setSelectedPreset(idx);
    setImageUrl("");
    setCaption(PRESET_STORIES[idx].caption);
  };

  return (
    <div className="post-story-backdrop" onClick={onClose}>
      <div className="post-story-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="post-story-header">
          <div className="post-story-title">
            <Sparkles size={20} className="sparkle-icon" />
            <h3>Create a Story</h3>
          </div>
          <button className="post-story-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="post-story-body">
          {/* Story Preview */}
          <div className="story-create-preview">
            <img
              src={currentPreviewUrl}
              alt="Story Preview"
              onError={(e) => {
                e.target.src = PRESET_STORIES[0].url;
              }}
            />
            {caption && (
              <div className="preview-caption-badge">
                <p>{caption}</p>
              </div>
            )}
            <div className="preview-overlay-tag">Preview</div>
          </div>

          {/* Controls */}
          <div className="story-create-controls">
            <label className="input-label">Choose Preset Photo:</label>
            <div className="preset-grid">
              {PRESET_STORIES.map((preset, idx) => (
                <button
                  type="button"
                  key={idx}
                  className={`preset-chip ${selectedPreset === idx && !imageUrl ? "active" : ""}`}
                  onClick={() => handleSelectPreset(idx)}
                >
                  <img src={preset.url} alt={preset.name} />
                  <span>{preset.name}</span>
                </button>
              ))}
            </div>

            <label className="input-label">Or Custom Image URL:</label>
            <div className="custom-url-input-box">
              <Image size={18} className="input-icon" />
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>

            <label className="input-label">Caption / Story Text:</label>
            <input
              type="text"
              className="caption-input"
              placeholder="Add a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />

            <div className="post-story-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="publish-story-btn">
                <Upload size={18} />
                <span>Share to Story</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostStoryModal;
