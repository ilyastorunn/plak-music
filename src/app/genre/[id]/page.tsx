interface GenrePageProps {
  params: {
    id: string;
  };
}

export default function GenrePage({ params }: GenrePageProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
          Genre: {params.id}
        </h1>
        
        {/* Songs Grid - Will be implemented with actual data */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Placeholder for song cards */}
          <div className="bg-gray-100 rounded-lg p-6 text-center">
            <p className="text-gray-600">Song cards with vinyl hover animation will be implemented here</p>
          </div>
        </div>
      </div>
    </div>
  );
} 