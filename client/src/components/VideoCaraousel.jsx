import { useState, useRef, useEffect, useCallback } from "react";
import "../styles/videocaraousel.css";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import VolumeOffOutlinedIcon from "@mui/icons-material/VolumeOffOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

// const initialVideos = [
//   { id: 1, src: "/Videos/VID-20250204-WA0022.mp4" },
//   { id: 2, src: "/Videos/VID-20250204-WA0003(1).mp4" },
//   { id: 3, src: "/Videos/VID-20250204-WA0022.mp4" },
//   { id: 4, src: "/Videos/VID-20250204-WA0003(1).mp4" },
//   { id: 5, src: "/Videos/VID-20250204-WA0022.mp4" },
// ];

const initialVideos = [
  { id: 1, src: "/Videos/04.mp4" },
  { id: 2, src: "/Videos/05.mp4" },
  { id: 3, src: "/Videos/01.mp4" },
  { id: 4, src: "/Videos/02.mp4" },
  { id: 5, src: "/Videos/06.mp4" },
];

const VideoCarousel = () => {
  const [videos, setVideos] = useState(initialVideos);
  const [muted, setMuted] = useState(true);
  const videoRefs = useRef([]);

  // Update video playback whenever the videos or muted state changes
  useEffect(() => {
    videos.forEach((video) => {
      const vidElement = videoRefs.current[video.id];
      if (vidElement) {
        if (video.id === videos[2].id) {
          vidElement.muted = muted;
          vidElement
            .play()
            .catch((err) => console.error("Playback error:", err));
        } else {
          vidElement.pause();
        }
      }
    });
  }, [videos, muted]);

  // Use useCallback to memoize navigation handlers to avoid re-rendering unnecessarily
  const handleNext = useCallback(() => {
    setVideos((prev) => [...prev.slice(1), prev[0]]);
  }, []);

  const handlePrev = useCallback(() => {
    setVideos((prev) => [prev[prev.length - 1], ...prev.slice(0, -1)]);
  }, []);

  const toggleMute = () => {
    setMuted((prevMuted) => !prevMuted);
  };

  return (
    <div className="mt-5">
      <h2
        className="text-center"
        style={{
          fontSize: "1.25rem",
          fontWeight: "400",
          marginTop: "4rem",
          marginBottom: "4rem",
        }}
      >
        Trending Looks To Watch
      </h2>
      <div className="video-carousel mt-5 mb-5">
        {videos.map((video, index) => {
          const isActive = index === 2; // Center video
          return (
            <div
              key={video.id}
              className={`video-wrapper position-${index - 2} ${
                isActive ? "active" : "inactive"
              }`}
            >
              <video
                ref={(el) => {
                  if (el) {
                    videoRefs.current[video.id] = el;
                  }
                }}
                src={video.src}
                autoPlay
                loop
                playsInline
                muted={index !== 2 || muted}
                className={`carousel-video ${isActive ? "playing" : "hidden"} ${
                  !isActive ? "blurred" : ""
                }`}
              />
              {isActive && (
                <button className="mute-btn" onClick={toggleMute}>
                  {muted ? <VolumeOffOutlinedIcon /> : <VolumeUpOutlinedIcon />}
                </button>
              )}
            </div>
          );
        })}

        <button className="prev-btn" onClick={handlePrev}>
          <ArrowBackIosNewIcon fontSize="medium" />
        </button>
        <button className="next-btn" onClick={handleNext}>
          <ArrowForwardIosIcon fontSize="medium" />
        </button>
      </div>
    </div>
  );
};

export default VideoCarousel;
