"use client";

import { useState } from "react";

interface Match {
  team1: string;
  team2: string;
}

export default function TieSheetGeneration() {
  const [teams, setTeams] = useState<string[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);

  const handleTeamInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTeams(
      event.target.value
        .split("\n")
        .map((team) => team.trim())
        .filter((team) => team)
    );
  };

  const generateMatches = () => {
    if (teams.length < 2) return alert("Please enter at least two teams");

    const shuffledTeams: string[] = [...teams].sort(() => Math.random() - 0.5);
    const generatedMatches: Match[] = [];

    for (let i = 0; i < shuffledTeams.length; i += 2) {
      if (i + 1 < shuffledTeams.length) {
        generatedMatches.push({
          team1: shuffledTeams[i],
          team2: shuffledTeams[i + 1],
        });
      }
    }

    setMatches(generatedMatches);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">
          Tie Sheet Generation
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Enter team names to generate match schedules.
        </p>
      </header>

      <main className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <textarea
            placeholder="Enter team names, one per line..."
            className="w-full p-4 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={5}
            onChange={handleTeamInput}
          ></textarea>

          <button
            onClick={generateMatches}
            className="w-full px-6 py-3 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-200"
          >
            Generate Matches
          </button>
        </div>

        {matches.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Tournament Bracket
            </h2>
            <div className="space-y-8">
              {/* Round 1 */}
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  Round 1
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {matches.map((match, index) => (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500"
                    >
                      <p className="text-lg font-semibold text-gray-800 mb-2">
                        Match {index + 1}
                      </p>
                      <p className="text-gray-600">
                        {match.team1}{" "}
                        <span className="mx-2 text-gray-400">vs</span>{" "}
                        {match.team2}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Semi-Finals */}
              {matches.length > 2 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    Semi-Finals
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[...Array(Math.ceil(matches.length / 2))].map(
                      (_, index) => (
                        <div
                          key={index}
                          className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500"
                        >
                          <p className="text-lg font-semibold text-gray-800 mb-2">
                            Semi-Final {index + 1}
                          </p>
                          <p className="text-gray-600">
                            Winner of Match {index * 2 + 1}{" "}
                            <span className="mx-2 text-gray-400">vs</span>{" "}
                            Winner of Match {index * 2 + 2}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Finals */}
              {matches.length > 2 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    Finals
                  </h3>
                  <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500">
                    <p className="text-lg font-semibold text-gray-800 mb-2">
                      Final Match
                    </p>
                    <p className="text-gray-600">
                      Winner of Semi-Final 1{" "}
                      <span className="mx-2 text-gray-400">vs</span> Winner of
                      Semi-Final 2
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
