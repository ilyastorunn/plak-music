'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import VinylLoader from '../animations/VinylLoader';

interface LoadingWrapperProps {
  children: React.ReactNode;
}

export default function LoadingWrapper({ children }: LoadingWrapperProps) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (isLoading) {
    return <VinylLoader />;
  }

  return <>{children}</>;
} 