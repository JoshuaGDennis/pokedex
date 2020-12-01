import React, { useState } from "react";
import styles from "styles/Image.module.scss";
import Image, { ImageProps } from "react-bootstrap/Image";

interface iImageProps extends ImageProps {
  loadedClasses?: string;
  noAnimate?: boolean
}

const CustomImage: React.FC<iImageProps> = ({
  onLoad,
  loadedClasses = '',
  noAnimate,
  className,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleOnLoad = () => {
    setIsLoaded(true);
  };

  const classes = [
    className,
    styles.image,
    isLoaded ? loadedClasses : '',
    (isLoaded && !noAnimate) ? styles.loaded : styles['no-animate']
  ]

  return (
    <Image
      {...props}
      className={classes.join(" ")}
      onLoad={handleOnLoad}
    />
  );
};

export default CustomImage;
