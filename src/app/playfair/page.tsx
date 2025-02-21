import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container min-h-screen p-8">
        <header className="mb-12 max-w-4xl">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Tournament <span className="text-gray-500">Dashboard</span>
          </h1>
          <p className="text-xl text-gray-600 font-medium">
            Streamline your tournament management - teams, schedules, and
            rankings
          </p>
        </header>

        <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between">
            <div className="mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Team Assignment
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Automatically assign players to balanced teams using our smart
                algorithm
              </p>
            </div>
            <Link
              href="/playfair/teamassign"
              className="w-full px-6 py-3 text-center bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-shadow duration-200"
            >
              Assign Teams →
            </Link>
          </div>

          <div className="bg-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between">
            <div className="mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Schedule Generator
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Create optimized match schedules with automatic time slot
                management
              </p>
            </div>
            <Link
              href="/playfair/schedule"
              className="w-full px-6 py-3 text-center bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:shadow-lg transition-shadow duration-200"
            >
              Generate Schedule →
            </Link>
          </div>

          <div className="bg-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between">
            <div className="mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Live Rankings
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Real-time points table with team statistics and performance
                metrics
              </p>
            </div>
            <Link
              href="/playfair/ranking"
              className="w-full px-6 py-3 text-center bottom-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-shadow duration-200"
            >
              View Rankings →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
