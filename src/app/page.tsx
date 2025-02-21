import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="overflow-hidden">
          <div className="container mx-auto flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 px-8 py-12 lg:py-24">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Welcome to <span className="text-blue-600">PlayFair</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Effortlessly manage teams, create schedules, and track points
                for your sports events.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-95">
                  Get Started
                </button>
                <Link
                  href="/playfair"
                  className="w-full sm:w-auto px-8 py-3.5 bg-white border-2 border-gray-200 hover:border-blue-500 text-gray-700 font-semibold rounded-lg transition-all duration-200 hover:shadow-md"
                >
                  Dashboard
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 p-8">
              <div className="relative aspect-square w-full">
                <Image
                  className="object-contain"
                  alt="hero"
                  src="/images/hero.svg"
                  fill
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
            Features
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Everything you need to manage your sports events efficiently
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100">
              <div className="w-12 h-12 mb-4 bg-blue-50 rounded-lg flex items-center justify-center">
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
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Team Assignment
              </h3>
              <p className="text-gray-600">
                Easily assign players to teams with our intuitive tools and
                balanced algorithms.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100">
              <div className="w-12 h-12 mb-4 bg-blue-50 rounded-lg flex items-center justify-center">
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Match Scheduling
              </h3>
              <p className="text-gray-600">
                Automatically generate fair match schedules for smooth
                tournament operations.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100">
              <div className="w-12 h-12 mb-4 bg-blue-50 rounded-lg flex items-center justify-center">
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Points Table
              </h3>
              <p className="text-gray-600">
                Track team rankings with real-time updates and comprehensive
                statistics.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
