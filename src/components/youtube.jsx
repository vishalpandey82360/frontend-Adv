import React from 'react'

const youtube = () => {
  return (
    <div>
      <button>search</button>
      <h1>YOUTUBE</h1>
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
          <div
            key={user.id}
            className="story-avatar-wrapper"
            onClick={() => openStory(idx)}
          >
            <div className={`avatar-ring ${user.seen ? "seen" : ""}`}>
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
              <img
                src={post.avatar}
                className="avatar-small"
                alt={post.username}
              />
              <span className="username">{post.username}</span>
            </div>
            <div className="video-wrapper">
              <video
                src={post.videoUrl}
                controls
                playsInline
                loop
                preload="metadata"
              />
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
            <div className="story-user-header">
              <img
                src={currentUser.avatar}
                alt={currentUser.username}
                className="avatar-small"
              />
              <span className="username">{currentUser.username}</span>
              <button className="close-btn" onClick={closeStory}>
                &times;
              </button>
            </div>

            {/* Story Media */}
            <div className="story-media-container">
              <img src={currentItem.url} alt="Story Media" />
            </div>

            {/* Tap Navigation Overlays */}
            <div
              className="tap-zone tap-left"
              onClick={(e) => {
                e.stopPropagation();
                prevStory();
              }}
            />
            <div
              className="tap-zone tap-right"
              onClick={(e) => {
                e.stopPropagation();
                nextStory();
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default youtube
