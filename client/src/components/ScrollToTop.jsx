// ScrollToTop.jsx
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if there is no hash in the URL before scrolling to the top
    if (!location.hash) {
      window.scrollTo(0, 0); // Scroll to the top only if there's no hash
    }
  }, [location]);

  return null;
};

export default ScrollToTop;
