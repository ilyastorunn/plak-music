import { GenreCard } from "@/components/ui/GenreCard";
import { mockGenres } from "@/lib/data/mockData";
import Link from "next/link";

export default function ExplorePage() {
  return (
    <div
      className="min-h-screen relative"
      style={{ backgroundColor: "#F5EDF0" }}
    >
      {/* Header */}
      <div className="absolute top-[1rem] left-[1rem] z-50 pl-[0.5rem] pt-[0.5rem]">
        <Link
          href="/"
          className="font-Magtis text-[2rem] md:text-[3rem] text-[#4B5D6C] font-extrabold hover:text-[#FF6B00] transition duration-500"
        >
          &quot;plak&quot;
        </Link>
        <p
          className="font-Magtis font-bold pl-[1.25rem] text-sm md:text-base"
          style={{ color: "#4B5D6C" }}
        >
          genres
        </p>
      </div>

      {/* Main Layout */}
      <div className="flex min-h-screen">
        {/* Left Panel - Fixed Title and Description */}
        <div className="w-1/2 fixed top-0 left-0 h-full pt-24">
          <div className="h-full flex flex-col justify-center pl-16 pr-8">
            <div className="max-w-md">
              <h1
                className="text-3xl md:text-4xl font-normal mb-5 leading-tight"
                style={{ color: "#4B5D6C", fontFamily: "Magtis" }}
              >
                Explore Genres
              </h1>
              <p
                className="text-sm md:text-base leading-relaxed"
                style={{ color: "#4B5D6C", fontFamily: "Inter" }}
              >
                Dive deep into musical genres and discover rare, forgotten treasures waiting to be rediscovered.
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel - Content Area */}
        <div className="w-1/2 ml-[50%]">
          <div className="pt-24 pl-4 pr-8 pb-16">
            <div className="grid grid-cols-2 gap-4">
              {mockGenres.map((genre) => (
                <GenreCard key={genre.id} genre={genre} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
