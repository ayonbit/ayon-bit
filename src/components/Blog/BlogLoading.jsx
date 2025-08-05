export default function BlogLoading() {
  return (
    <div className="animate-pulse">
      {/* Header Skeleton */}
      <div className="text-center mb-10 lg:mb-14">
        <div className="h-8 sm:h-10 md:h-12 w-3/4 mx-auto bg-gray-700 rounded mb-4 sm:mb-6"></div>
        <div className="h-4 w-5/6 mx-auto bg-gray-700 rounded mb-2"></div>
        <div className="h-4 w-2/3 mx-auto bg-gray-700 rounded"></div>
      </div>

      {/* Filters Skeleton (if you have filters) */}
      <div className="flex flex-wrap gap-3 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-8 w-20 bg-gray-700 rounded-full"></div>
        ))}
      </div>

      {/* Blog Posts Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-lg overflow-hidden">
            {/* Image Placeholder */}
            <div className="aspect-video bg-gray-700 w-full"></div>

            {/* Content Placeholder */}
            <div className="p-4 space-y-3">
              <div className="h-4 w-1/2 bg-gray-700 rounded"></div>
              <div className="h-6 w-3/4 bg-gray-700 rounded"></div>
              <div className="space-y-2">
                <div className="h-3 w-full bg-gray-700 rounded"></div>
                <div className="h-3 w-5/6 bg-gray-700 rounded"></div>
                <div className="h-3 w-4/6 bg-gray-700 rounded"></div>
              </div>
              <div className="h-4 w-20 bg-gray-700 rounded mt-4"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton (if you have pagination) */}
      <div className="flex justify-center mt-10 gap-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-10 w-10 bg-gray-700 rounded-full"></div>
        ))}
      </div>
    </div>
  );
}
