import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          Plak
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-md mx-auto">
          Discover and listen to copyright-free music
        </p>
        
        <Link 
          href="/explore"
          className="inline-block bg-black text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-colors duration-200"
        >
          Explore
        </Link>
      </div>
    </div>
  );
}
