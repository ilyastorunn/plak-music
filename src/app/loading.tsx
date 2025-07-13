import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F5EDF0]">
      <div className="relative">
        <Image
          src="/vinyl.png"
          alt="Loading..."
          width={192}
          height={192}
          className="animate-spin-slow drop-shadow-2xl"
          priority
        />
      </div>
    </div>
  );
} 