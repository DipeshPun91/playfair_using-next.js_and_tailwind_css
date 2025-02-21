"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Match {
  team1: string;
  team2: string;
  winner?: string;
}

type TieSheetType = "knockout" | "league";

export default function TieSheetGeneration() {
  const router = useRouter();
  const [teams, setTeams] = useState<string[]>([]);
  const [tieSheetType, setTieSheetType] = useState<TieSheetType>("knockout");

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

    const rounds: Match[][] = [];

    if (tieSheetType === "knockout") {
      const shuffledTeams = [...teams].sort(() => Math.random() - 0.5);
      let currentRoundTeams = shuffledTeams;

      while (currentRoundTeams.length > 1) {
        const roundMatches: Match[] = [];

        for (let i = 0; i < currentRoundTeams.length; i += 2) {
          if (i + 1 < currentRoundTeams.length) {
            roundMatches.push({
              team1: currentRoundTeams[i],
              team2: currentRoundTeams[i + 1],
            });
          } else {
            roundMatches.push({
              team1: currentRoundTeams[i],
              team2: "Bye",
              winner: currentRoundTeams[i],
            });
          }
        }

        rounds.push(roundMatches);
        currentRoundTeams = roundMatches.map((match) => match.winner || "");
      }
    } else if (tieSheetType === "league") {
      for (let i = 0; i < teams.length; i++) {
        for (let j = i + 1; j < teams.length; j++) {
          rounds.push([{ team1: teams[i], team2: teams[j] }]);
        }
      }
    }

    localStorage.setItem("tournamentMatches", JSON.stringify(rounds));
    localStorage.setItem("tieSheetType", tieSheetType);
    router.push("/bracket");
  };

  return (
    <div className="container min-h-screen bg-primary p-8">
      <div className="max-w-7xl px-4">
        <header className="mb-12 text-start">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Tie Sheet Generation
          </h1>
          <p className="text-xl text-gray-600">
            Enter team names to generate match schedules.
          </p>
        </header>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 w-full">
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Team List
              </label>
              <textarea
                placeholder="Enter team names, one per line..."
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-75 ease-in-out custom-scrollbar resize-none"
                rows={6}
                onChange={handleTeamInput}
              ></textarea>
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Tie Sheet Type
              </label>
              <select
                value={tieSheetType}
                onChange={(e) =>
                  setTieSheetType(e.target.value as TieSheetType)
                }
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-75 ease-in-out"
              >
                <option value="knockout">Knockout</option>
                <option value="league">League</option>
              </select>
            </div>

            <button
              onClick={generateMatches}
              className="w-full mt-4 py-3.5 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.01] flex items-center justify-center"
            >
              <span className="mr-2">Generate Matches</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
