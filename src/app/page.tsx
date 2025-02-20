import Image from "next/image";

export default function Home() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen bg-primary p-8">
      <main className="flex flex-col items-center gap-8">
        <section className="text-gray-600 body-font">
          <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                Welcome to PlayFair
              </h1>
              <p className="mb-8 leading-relaxed">
                Effortlessly manage teams, create schedules, and track points.
              </p>
              <div className="flex justify-center">
                <button className="inline-flex text-white bg-accent border-0 py-2 px-6 focus:outline-none hover:bg-accent-HOVER rounded text-lg">
                  Get Started
                </button>
                <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                  Dashboard
                </button>
              </div>
            </div>
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
              <Image
                className="object-cover object-center rounded"
                alt="hero"
                src="\images\hero.svg"
                width="720"
                height="600"
              />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-primary shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800">
              Team Assignment
            </h2>
            <p className="text-gray-600 mt-2">
              Easily assign players to teams with our intuitive tools.
            </p>
          </div>
          <div className="p-6 bg-primary shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800">
              Match Scheduling
            </h2>
            <p className="text-gray-600 mt-2">
              Automatically generate match schedules for a smooth tournament.
            </p>
          </div>
          <div className="p-6 bg-primary shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800">
              Points Table
            </h2>
            <p className="text-gray-600 mt-2">
              Keep track of team rankings with an up-to-date points table.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
