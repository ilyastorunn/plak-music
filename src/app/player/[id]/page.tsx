interface PlayerPageProps {
  params: {
    id: string;
  };
}

export default function PlayerPage({ params }: PlayerPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
            Music Player
          </h1>
          
          {/* Player Interface - Will be implemented with actual data */}
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <p className="text-gray-600 mb-4">Song ID: {params.id}</p>
            <p className="text-gray-600">Audio player component will be implemented here</p>
            
            {/* Placeholder for player controls */}
            <div className="mt-8 space-y-4">
              <div className="bg-gray-200 h-2 rounded-full"></div>
              <div className="flex justify-center space-x-4">
                <button className="bg-gray-300 w-12 h-12 rounded-full"></button>
                <button className="bg-gray-300 w-16 h-16 rounded-full"></button>
                <button className="bg-gray-300 w-12 h-12 rounded-full"></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 