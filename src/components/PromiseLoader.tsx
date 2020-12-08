import React, { ReactElement, useCallback, useEffect, useState } from "react";

interface iProps {
  render(items: any[]): React.ReactNode;
  renderLoading?(): ReactElement<any, any>;
  promises: Promise<any>[];
  loading?: boolean;
}

const PromiseLoader: React.FC<iProps> = ({
  render,
  renderLoading,
  promises,
  loading,
}) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(
    loading !== undefined ? loading : true
  );

  const loadPromises = useCallback(() => {
    setIsLoading(true);
    Promise.all(promises).then((data) => {
      setData(data);
      if (loading === undefined) {
        setIsLoading(false);
      }
    });
  }, [promises, loading]);

  useEffect(() => loadPromises(), [loadPromises]);

  if (isLoading) return renderLoading ? renderLoading() : null;

  return <>{render(data)}</>;
};

export default PromiseLoader;
