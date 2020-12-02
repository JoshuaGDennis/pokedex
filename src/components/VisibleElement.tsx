import React, { useRef } from "react";
import useVisibility from "helpers/useVisibility";
import styles from "styles/VisibleElement.module.scss";

interface iProps {
  onVisible?(): any;
  className?: string;
  once?: boolean;
  children?: React.ReactNode;
}

const VisibilityElement: React.FC<iProps> = ({
  onVisible = () => {},
  className,
  once,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useVisibility(ref, { fn: onVisible, once });

  return (
    <div ref={ref} className={`${styles.loader} ${className}`}>
      {children}
    </div>
  );
};

export default VisibilityElement;
