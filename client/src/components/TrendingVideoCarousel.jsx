import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/TrendingVideoCarousel.css";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import VolumeOffOutlinedIcon from "@mui/icons-material/VolumeOffOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const Videos = [
  { id: 1, src: "/Videos/01.mp4" },
  { id: 2, src: "/Videos/05.mp4" },
  { id: 3, src: "/Videos/04.mp4" },
  { id: 4, src: "/Videos/02.mp4" },
  { id: 5, src: "/Videos/06.mp4" },
  // { id: 6, src: "/Videos/03.mp4" },
];

const TrendingVideoCarousel = () => {
  const videoRefs = useRef({});
  const [activeVideo, setActiveVideo] = useState(null);
  const [muted, setMuted] = useState(true);

  const handleMouseEnter = (videoId) => {
    if (activeVideo !== videoId) {
      // Pause all videos
      Object.values(videoRefs.current).forEach((video) => {
        if (video) video.pause();
      });

      // Play the hovered video
      const hoveredVideo = videoRefs.current[videoId];
      if (hoveredVideo) {
        hoveredVideo.muted = muted;
        hoveredVideo
          .play()
          .catch((err) => console.error("Playback error:", err));
        setActiveVideo(videoId);
      }
    }
  };

  const handleMouseLeave = () => {
    // When hover is removed, keep playing the last hovered video
    if (activeVideo) {
      const lastHoveredVideo = videoRefs.current[activeVideo];
      if (lastHoveredVideo) {
        lastHoveredVideo.muted = muted;
        lastHoveredVideo
          .play()
          .catch((err) => console.error("Playback error:", err));
      }
    }
  };

  const toggleMute = () => {
    setMuted((prevMuted) => !prevMuted);

    if (activeVideo) {
      const video = videoRefs.current[activeVideo];
      if (video) {
        video.muted = !muted;
      }
    }
  };

  return (
    <div className="trending-carousel-container mt-3">
      <h2
        className="trending-carousel-title"
        style={{
          fontSize: "1.25rem",
          fontWeight: "400",
          marginTop: "20px",
          marginBottom: "50px",
        }}
      >
        Trending Looks To Watch
      </h2>
      <div className="trending-carousel">
        {Videos.map((video) => (
          <div
            className="trending-carousel-item"
            key={video.id}
            onMouseEnter={() => handleMouseEnter(video.id)}
            onMouseLeave={handleMouseLeave}
          >
            {/* Overlay for dark gradient effect */}
            <div className="trending-video-overlay"></div>

            <video
              ref={(el) => (videoRefs.current[video.id] = el)}
              src={video.src}
              className="trending-video"
              loop
              playsInline
              muted={muted}
            />

            {/* Hide Play Button if video is active */}
            {activeVideo !== video.id && (
              <div className="trending-play-button">
                <PlayArrowIcon fontSize="large" />
              </div>
            )}

            {/* Mute Button for Active Video */}
            {activeVideo === video.id && (
              <button className="mute-btn" onClick={toggleMute}>
                {muted ? <VolumeOffOutlinedIcon /> : <VolumeUpOutlinedIcon />}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingVideoCarousel;
