'use client';
import { useState, useEffect } from 'react';
export default function ClientDate({ date }: { date: string }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (isClient) {
    return <>{new Date(date).toLocaleDateString()}</>;
  }
  return <>{date}</>;
}
