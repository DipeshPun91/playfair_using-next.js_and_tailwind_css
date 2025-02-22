"use client";

import { useState } from "react";
import jsPDF from "jspdf";

interface Teams {
  [key: string]: string[][];
}

const gameTeamSizes: { [key: string]: number } = {
  Football: 5,
  Basketball: 5,
  "Table Tennis": 2,
  Badminton: 2,
  Cricket: 11,
};

export default function TeamAssignment() {
  const [players, setPlayers] = useState<string[]>([]);
  const [teams, setTeams] = useState<Teams>({});
  const [game, setGame] = useState<string>("");

  const games = Object.keys(gameTeamSizes);

  const handlePlayerInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPlayers(
      event.target.value
        .split("\n")
        .map((player: string) => player.trim())
        .filter((player: string) => player)
    );
  };

  const assignTeams = () => {
    if (!game) return alert("Please select a game");

    const teamSize = gameTeamSizes[game];
    const shuffledPlayers: string[] = [...players].sort(
      () => Math.random() - 0.5
    );
    const numTeams = Math.ceil(shuffledPlayers.length / teamSize);

    const assignedTeams: string[][] = Array.from(
      { length: numTeams },
      () => []
    );

    shuffledPlayers.forEach((player, index) => {
      assignedTeams[index % numTeams].push(player);
    });

    setTeams({ ...teams, [game]: assignedTeams });
  };

  const downloadPDF = () => {
    if (!game || !teams[game]) return alert("No teams to download");

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`${game} Teams`, 10, 10);

    let yOffset = 20;
    teams[game].forEach((team, index) => {
      doc.setFontSize(14);
      doc.text(`Team ${index + 1} (${team.length} players)`, 10, yOffset);
      yOffset += 10;

      doc.setFontSize(12);
      team.forEach((player) => {
        doc.text(`- ${player}`, 15, yOffset);
        yOffset += 10;
      });

      yOffset += 10;
    });

    doc.save(`${game}-teams.pdf`);
  };

  const downloadTextFile = () => {
    if (!game || !teams[game]) return alert("No teams to download");

    let content = `${game} Teams\n\n`;
    teams[game].forEach((team, index) => {
      content += `Team ${index + 1} (${team.length} players):\n`;
      team.forEach((player) => {
        content += `- ${player}\n`;
      });
      content += "\n";
    });

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${game}-teams.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container min-h-screen p-8">
        <div className="mx-auto px-4">
          <header className="mb-12 text-start">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Team <span className="text-gray-500">Assignment</span>
            </h1>
            <p className="text-lg text-gray-600">
              Create balanced teams for your sports events in seconds
            </p>
          </header>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 w-full">
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Players List
                </label>
                <textarea
                  placeholder="Enter one player name per line..."
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-75 ease-in-out custom-scrollbar resize-none"
                  rows={6}
                  onChange={handlePlayerInput}
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Select Sport
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={game}
                  onChange={(e) => setGame(e.target.value)}
                >
                  <option value="">Choose a sport...</option>
                  {games.map((g) => (
                    <option key={g} value={g}>
                      {g} ({gameTeamSizes[g]} players per team)
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={assignTeams}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.01] flex items-center justify-center"
              >
                <span className="mr-2">Generate Teams</span>
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

          {game && teams[game] && (
            <div className="mt-12">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  {game} Teams
                </h2>
                <div className="flex gap-4">
                  <button
                    onClick={downloadPDF}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200"
                  >
                    Download as PDF
                  </button>
                  <button
                    onClick={downloadTextFile}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200"
                  >
                    Download as Text File
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {teams[game].map((team, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Team {index + 1}
                      </h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                        {team.length} players
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {team.map((player, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-gray-600"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-2 text-blue-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {player}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
