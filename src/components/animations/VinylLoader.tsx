'use client';

const VinylLoader = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F5EDF0]">
      <img
        src="/vinyl.png"
        alt="Loading Vinyl"
        className="w-48 h-48 animate-spin-slow transition-all duration-1000 drop-shadow-2xl"
      />
    </div>
  );
};

export default VinylLoader; 