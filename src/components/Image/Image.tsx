import "./Image.scss"
import * as React from 'react'
import Image, { ImageProps } from "react-bootstrap/Image";

const { useState } = React

interface iImageProps extends ImageProps {
  noAnimate?: boolean
}

const CustomImage: React.FC<iImageProps> = ({
  onLoad,
  noAnimate,
  className,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleOnLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    onLoad && onLoad(e)
  };

  return (
    <Image
      {...props}
      className={`${className || ''} ${(isLoaded && !noAnimate) ? 'loaded' : 'no-animate'}`}
      onLoad={handleOnLoad}
    />
  );
};

export default CustomImage;
