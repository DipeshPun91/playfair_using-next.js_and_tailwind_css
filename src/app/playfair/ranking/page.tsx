"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Team {
  id: number;
  name: string;
  wins: number;
  losses: number;
  points: number;
}

export default function RankingPage() {
  const [teams, setTeams] = useState<Team[]>([
    { id: 1, name: "Team A", wins: 5, losses: 1, points: 15 },
    { id: 2, name: "Team B", wins: 4, losses: 2, points: 12 },
    { id: 3, name: "Team C", wins: 3, losses: 3, points: 9 },
    { id: 4, name: "Team D", wins: 2, losses: 4, points: 6 },
    { id: 5, name: "Team E", wins: 1, losses: 5, points: 3 },
  ]);
  const [newTeamName, setNewTeamName] = useState("");

  const addWin = (teamId: number) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team.id === teamId
          ? { ...team, wins: team.wins + 1, points: team.points + 3 }
          : team
      )
    );
  };

  const addLoss = (teamId: number) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team.id === teamId ? { ...team, losses: team.losses + 1 } : team
      )
    );
  };

  const deleteTeam = (teamId: number) => {
    setTeams((prevTeams) => prevTeams.filter((team) => team.id !== teamId));
  };

  const handleAddTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTeamName.trim()) {
      setTeams((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: newTeamName.trim(),
          wins: 0,
          losses: 0,
          points: 0,
        },
      ]);
      setNewTeamName("");
    }
  };

  const sortedTeams = [...teams].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.wins !== a.wins) return b.wins - a.wins;
    return a.losses - b.losses;
  });

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("League Rankings", 10, 10);

    const headers = [["Rank", "Team", "Wins", "Losses", "Points"]];
    const data = sortedTeams.map((team, index) => [
      index + 1,
      team.name,
      team.wins,
      team.losses,
      team.points,
    ]);

    autoTable(doc, {
      head: headers,
      body: data,
      startY: 20,
      theme: "grid",
      styles: { fontSize: 12 },
      headStyles: { fillColor: [41, 128, 185] },
    });

    doc.save("league-rankings.pdf");
  };

  const downloadCSV = () => {
    const headers = ["Rank,Team,Wins,Losses,Points"];
    const data = sortedTeams.map((team, index) =>
      [index + 1, team.name, team.wins, team.losses, team.points].join(",")
    );

    const csvContent = headers.concat(data).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "league-rankings.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container min-h-screen p-8">
        <header className="mb-12 max-w-4xl">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            League <span className="text-gray-500">Rankings</span>
          </h1>
          <p className="text-xl text-gray-600 font-medium">
            Track your teams progress with real-time rankings and performance
            stats.
          </p>
        </header>

        <form
          onSubmit={handleAddTeam}
          className="mb-8 max-w-7xl mx-auto bg-white p-4 rounded-2xl shadow-md"
        >
          <div className="flex gap-4">
            <input
              type="text"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              placeholder="Enter team name"
              className="flex-1 p-2 border rounded-lg"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
            >
              Add Team
            </button>
          </div>
        </form>

        <div className="max-w-7xl mx-auto bg-white p-8 rounded-2xl shadow-md">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">Ranking</h2>
            <div className="mb-6 flex gap-4">
              <button
                onClick={downloadPDF}
                className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
              >
                Download as PDF
              </button>
              <button
                onClick={downloadCSV}
                className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
              >
                Download as CSV
              </button>
            </div>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-3 border-b-2">Rank</th>
                <th className="p-3 border-b-2">Team</th>
                <th className="p-3 border-b-2">W</th>
                <th className="p-3 border-b-2">L</th>
                <th className="p-3 border-b-2">Pts</th>
                <th className="p-3 border-b-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedTeams.map((team, index) => (
                <tr
                  key={team.id}
                  className={index % 2 === 0 ? "bg-gray-50" : ""}
                >
                  <td className="p-3 font-medium">{index + 1}</td>
                  <td className="p-3">{team.name}</td>
                  <td className="p-3">{team.wins}</td>
                  <td className="p-3">{team.losses}</td>
                  <td className="p-3 font-semibold">{team.points}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => addWin(team.id)}
                      className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
                    >
                      + Win
                    </button>
                    <button
                      onClick={() => addLoss(team.id)}
                      className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600"
                    >
                      + Loss
                    </button>
                    <button
                      onClick={() => deleteTeam(team.id)}
                      className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
