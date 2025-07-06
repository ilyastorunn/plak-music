'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#F5EDF0' }}>
      {/* Floating Album Covers */}
      <motion.div
        className="absolute top-20 left-16 w-32 h-32 md:w-40 md:h-40 opacity-80 shadow-lg rounded-lg overflow-hidden"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 2, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <img 
          src="/covers/vintage-soul.jpg" 
          alt="Vintage Soul Album"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <motion.div
        className="absolute top-32 right-20 w-28 h-28 md:w-36 md:h-36 opacity-80 shadow-lg rounded-lg overflow-hidden"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -3, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <img 
          src="/covers/jazz-classics.webp" 
          alt="Jazz Classics Album"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-20 w-36 h-36 md:w-44 md:h-44 opacity-80 shadow-lg rounded-lg overflow-hidden"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 4, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <img 
          src="/covers/folk-treasures.jpg" 
          alt="Folk Treasures Album"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-16 w-30 h-30 md:w-38 md:h-38 opacity-80 shadow-lg rounded-lg overflow-hidden"
        animate={{
          y: [0, 12, 0],
          rotate: [0, -2, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      >
        <img 
          src="/covers/vintage-soul.jpg" 
          alt="Vintage Soul Album"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Additional floating covers for larger screens */}
      <motion.div
        className="absolute top-1/2 left-8 w-24 h-24 md:w-32 md:h-32 opacity-80 shadow-lg rounded-lg overflow-hidden hidden md:block"
        animate={{
          y: [0, -8, 0],
          rotate: [0, 3, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      >
        <img 
          src="/covers/jazz-classics.webp" 
          alt="Jazz Classics Album"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-8 w-26 h-26 md:w-34 md:h-34 opacity-80 shadow-lg rounded-lg overflow-hidden hidden md:block"
        animate={{
          y: [0, 18, 0],
          rotate: [0, -4, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      >
        <img 
          src="/covers/folk-treasures.jpg" 
          alt="Folk Treasures Album"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            className="text-[6xl] md:text-8xl lg:text-[72px] font-normal mb-8"
            style={{ color: '#4B5D6C', fontFamily: 'Magtis' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
                      >
              &quot;plak&quot;
            </motion.h1>
          
          <motion.div
            className="mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          >
            <p className={`text-xl md:text-2xl lg:text-base leading-relaxed ${inter.className}`} style={{ color: '#4B5D6C' }}>
              a place to rediscover rare, forgotten and timeless songs.
            </p>
            <p className={`text-lg md:text-xl lg:text-base italic ${inter.className}`} style={{ color: '#4B5D6C' }}>
              Nostalgic vibes - lose yourself to music.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            <Link 
              href="/explore"
              className="cta border-none bg-transparent cursor-pointer flex items-center justify-center gap-2 p-0"
            >
              <span className={`hover-underline-animation relative text-[#4B5E6C] hover:text-[#D7521D] pb-1 text-base tracking-[2px] font-medium ${inter.className} flex items-center group`}>
                EXPLORE NOW!
              </span>
            </Link>
            
            <div className="flex justify-center">
              <Link 
                href="/select"
                className="inline-block px-6 py-3 bg-gradient-to-r from-[#D7521D] to-[#4B5D6C] text-white rounded-lg font-medium hover:translate-y-[-2px] transition-all duration-300 shadow-md hover:shadow-lg text-sm"
              >
                Album Selection
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .hover-underline-animation:after {
          content: "";
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 1px;
          bottom: 0;
          left: 0;
          background-color: #4B5E6C;
          transform-origin: bottom right;
          transition: transform 0.5s ease;
        }

        .cta:hover .hover-underline-animation:after {
          transform: scaleX(1);
          transform-origin: bottom left;
          background-color: #D7521D;
        }
      `}</style>
    </div>
  );
}
