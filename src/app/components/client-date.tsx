'use client';
export default function ClientDate({ date }: { date: string }) {
  if (typeof window !== 'undefined') {
    return <>{new Date(date).toLocaleDateString()}</>;
  }
  return <>{date}</>;
}
