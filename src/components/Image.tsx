import React, { useState } from "react";
import styles from "styles/Image.module.scss";
import Image, { ImageProps } from "react-bootstrap/Image";

interface iImageProps extends ImageProps {
  loadedClasses?: string;
}

const CustomImage: React.FC<iImageProps> = ({
  onLoad,
  loadedClasses,
  className,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleOnLoad = () => {
    setIsLoaded(true);
  };

  return (
    <Image
      {...props}
      className={`${className} ${styles.image} ${
        isLoaded ? `${styles.loaded} ${loadedClasses || ""}` : ""
      }`}
      onLoad={handleOnLoad}
    />
  );
};

export default CustomImage;
