// import { RefObject, useEffect, useState } from "react";
import * as React from 'react'

const { useEffect, useState } = React

const useVisibility = (ref: React.RefObject<HTMLDivElement>, options?: {fn?: () => any, once?: boolean}) => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio === 1) {
          setInView(true);
          options && options.fn && options.fn()
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
        if (options && options.once) {
          observer.disconnect()
        }
      }
    }
  }, [ref, options, inView]);

  return inView;
};

export default useVisibility;
