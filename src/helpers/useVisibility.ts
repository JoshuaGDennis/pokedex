import { RefObject, useEffect, useState } from "react";

const useVisibility = (ref: RefObject<HTMLDivElement>, callback?: () => any) => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio === 1) {
          setInView(true);
          callback && callback();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (ref.current) {
      if(!inView) {
        observer.observe(ref.current);
      } else {
        observer.disconnect()
      }
    }
  }, [ref, callback, inView]);

  return inView;
};

export default useVisibility;
