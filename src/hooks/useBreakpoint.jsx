import { useState, useEffect } from "react";

function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState("desktop"); // Default breakpoint

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width >= 1200) {
        setBreakpoint("desktop");
      } else if (width >= 640) {
        setBreakpoint("tablet");
      } else {
        setBreakpoint("mobile");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return breakpoint;
}

export default useBreakpoint;
