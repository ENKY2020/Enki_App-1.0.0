import React from 'react';
import './Podcast.css';

const Podcast = () => {
  return (
    <div className="podcast-section">
      {/* Header Section */}
      <div className="podcast-header">
        <h2>Lockdown Podcast KE</h2>
        <p>Tech insights, tutorials, and digital solutions</p>
      </div>

      {/* YouTube Embed */}
      <div className="youtube-embed">
        <iframe
          title="Lockdown Podcast KE"
          width="100%"
          height="400"
          src="https://www.youtube.com/embed?listType=user_uploads&list=lockdownpodcastKE"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Subscribe Button */}
      <div className="subscribe-button">
        <a
          href="https://www.youtube.com/@lockdownpodcastKE"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="subscribe-btn">Subscribe to Our Channel</button>
        </a>
      </div>
    </div>
  );
};

export default Podcast;
