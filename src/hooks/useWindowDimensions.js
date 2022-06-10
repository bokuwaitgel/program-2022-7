import { useState, useEffect, useMemo, useCallback } from 'react';

export const useWindowDimensions = () => {
  const hasWindow = useMemo(() => typeof window !== 'undefined', []);

  const getWindowDimensions = useCallback(() => {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width,
      height
    };
  }, [hasWindow]);

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    if (hasWindow) {
      const handleResize = () => {
        setWindowDimensions(getWindowDimensions());
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [getWindowDimensions, hasWindow]);

  const { width } = windowDimensions;
  return {
    windowDimensions,
    isSm: width < 768,
    isMd: width < 950,
    isMyMd: width < 1024,
    isLg: width < 1280,
    isXl: width < 1536,
    is2Xl: width >= 1536
  };
};
