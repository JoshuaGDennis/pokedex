import * as React from 'react'
import "./VisibleElement.scss";
import * as Hooks from 'helpers/hooks'

const { useRef } = React
const { useVisibility } = Hooks

interface iProps {
  onVisible?(): any;
  className?: string;
  once?: boolean;
  children?: React.ReactNode;
}

const VisibleElement: React.FC<iProps> = ({
  onVisible = () => {},
  className,
  once,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useVisibility(ref, { fn: onVisible, once });

  return (
    <div ref={ref} className={`visible-loader ${className || ""}`}>
      {children}
    </div>
  );
};

export default VisibleElement;
