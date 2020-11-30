import { RefObject, useEffect, useState } from "react";

const useVisibility = (ref: RefObject<HTMLDivElement>, callback: Function) => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio === 1) {
          setInView(true);
          callback();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
  }, [ref, callback]);

  return inView;
};

export default useVisibility;