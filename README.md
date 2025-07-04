# Plak Music - Copyright-Free Music Service

A music service website for copyright-free music built with Next.js, Tailwind CSS, and Framer Motion.

## 🚀 Current Setup (Phase 1 Complete)

### Tech Stack
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **ESLint** for code quality

### Project Structure
```
src/
├── app/
│   ├── page.tsx (Landing Page)
│   ├── explore/
│   │   └── page.tsx (Genres Grid)
│   ├── genre/
│   │   └── [id]/
│   │       └── page.tsx (Songs List)
│   └── player/
│       └── [id]/
│           └── page.tsx (Music Player)
├── components/
│   ├── ui/
│   │   └── Button.tsx (Reusable Button Component)
│   ├── layout/
│   └── animations/
│       └── VinylLoader.tsx (Vinyl Loading Animation)
├── lib/
│   ├── firebase/ (Ready for Firebase setup)
│   └── types/
│       └── index.ts (TypeScript interfaces)
└── styles/
```

### Features Implemented
- ✅ Minimalistic landing page with "Explore" button
- ✅ Basic routing structure for all pages
- ✅ TypeScript interfaces for Genre and Song
- ✅ Vinyl loading animation component
- ✅ Reusable Button component
- ✅ Clean, light-themed design

### Data Models
```typescript
interface Genre {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}

interface Song {
  id: string;
  title: string;
  artist: string;
  albumCover: string;
  audioUrl: string;
  genreId: string;
  duration: number;
  releaseDate: string;
}
```

## 🏃‍♂️ Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 Next Steps (Phase 2)

### Core Features to Implement
- [ ] Genre grid with hover animations
- [ ] Song cards with vinyl hover effects
- [ ] Music player functionality
- [ ] Firebase integration for data storage
- [ ] Audio file streaming
- [ ] Responsive design improvements

### Component Development
- [ ] GenreCard component with alternating hover effects
- [ ] SongCard component with vinyl animation
- [ ] AudioPlayer component with controls
- [ ] Navigation components
- [ ] Loading states for all pages

### Firebase Setup
- [ ] Firestore collections for genres and songs
- [ ] Firebase Storage for audio files and images
- [ ] Data fetching utilities
- [ ] Error handling

## 🎨 Design System

### Colors
- Primary: Black (#000000)
- Secondary: Gray shades
- Background: White (#FFFFFF)

### Typography
- Font Family: Inter
- Headings: Bold weights
- Body: Regular weights

### Animations
- Vinyl spinning effects
- Hover transitions
- Page transitions
- Loading states

## 📱 Responsive Breakpoints
- **sm**: 640px
- **md**: 768px  
- **lg**: 1024px
- **xl**: 1280px

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📚 Documentation

See the [scope.md](../scope.md) file for the complete project specification and implementation phases.
# plak-music
