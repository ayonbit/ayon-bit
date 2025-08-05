export default function BlogSingleLoading() {
  return (
    <div className="animate-pulse max-w-4xl mx-auto">
      {/* Title */}
      <div className="h-8 w-3/4 bg-gray-200 rounded mb-6"></div>

      {/* Featured Image */}
      <div className="aspect-video bg-gray-200 rounded-lg mb-8"></div>

      {/* Content */}
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
        ))}
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>

      {/* Author/Date */}
      <div className="flex items-center mt-8 gap-4">
        <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
        <div className="space-y-2">
          <div className="h-3 w-24 bg-gray-200 rounded"></div>
          <div className="h-3 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}
