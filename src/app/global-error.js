"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a] text-white p-4">
          <div className="max-w-md text-center space-y-2">
            <h1 className="text-6xl font-bold text-red-600">500!</h1>
            <h2 className="text-3xl font-semibold">Something went wrong!</h2>
            <button
              onClick={() => reset()}
              className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/80 transition-colors"
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
