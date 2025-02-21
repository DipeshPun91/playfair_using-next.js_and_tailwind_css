"use client";

import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface Match {
  team1: string;
  team2: string;
  winner?: string;
}

export default function BracketPage() {
  const [matches, setMatches] = useState<Match[][]>([]);
  const [tieSheetType, setTieSheetType] = useState<string>("knockout");

  useEffect(() => {
    const savedMatches = localStorage.getItem("tournamentMatches");
    const savedTieSheetType = localStorage.getItem("tieSheetType");
    if (savedMatches && savedTieSheetType) {
      setMatches(JSON.parse(savedMatches));
      setTieSheetType(savedTieSheetType);
    } else {
      window.location.href = "/";
    }
  }, []);

  const handleWinnerClick = (
    roundIndex: number,
    matchIndex: number,
    winner: string
  ) => {
    if (winner === "Bye") return;

    const updatedMatches = [...matches];
    updatedMatches[roundIndex][matchIndex].winner = winner;

    if (roundIndex < matches.length - 1) {
      const nextRoundMatchIndex = Math.floor(matchIndex / 2);
      if (!updatedMatches[roundIndex + 1][nextRoundMatchIndex]) {
        updatedMatches[roundIndex + 1][nextRoundMatchIndex] = {
          team1: "",
          team2: "",
        };
      }
      if (matchIndex % 2 === 0) {
        updatedMatches[roundIndex + 1][nextRoundMatchIndex].team1 = winner;
      } else {
        updatedMatches[roundIndex + 1][nextRoundMatchIndex].team2 = winner;
      }
    }

    setMatches(updatedMatches);
    localStorage.setItem("tournamentMatches", JSON.stringify(updatedMatches));
  };

  const downloadPDF = async () => {
    const element = document.getElementById("bracket");
    if (!element) return;

    const canvas = await html2canvas(element, {
      scrollX: -window.scrollX,
      scrollY: -window.scrollY,
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape", "pt", [canvas.width, canvas.height]);
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("tournament-bracket.pdf");
  };

  const getGlobalMatchIndex = (roundIndex: number, matchIndex: number) => {
    let globalIndex = 0;
    for (let i = 0; i < roundIndex; i++) {
      globalIndex += matches[i].length;
    }
    return globalIndex + matchIndex + 1;
  };

  return (
    <div className="bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Tournament Bracket</h1>
        <button
          onClick={downloadPDF}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Download PDF
        </button>
      </div>

      <div id="bracket" className="overflow-x-auto pb-4">
        {tieSheetType === "league" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((round, roundIndex) =>
              round.map((match, matchIndex) => {
                const globalMatchIndex = getGlobalMatchIndex(
                  roundIndex,
                  matchIndex
                );
                return (
                  <div
                    key={`${roundIndex}-${matchIndex}`}
                    className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm"
                  >
                    <h3 className="text-lg font-semibold text-center mb-4">
                      Match {globalMatchIndex}
                    </h3>
                    <div className="flex flex-col space-y-4">
                      <div
                        className={`rounded-lg border-l-4 cursor-pointer hover:bg-blue-100 transition-colors p-3 ${
                          match.winner === match.team1
                            ? "border-green-500 bg-green-50"
                            : "border-blue-500 bg-white"
                        }`}
                        onClick={() =>
                          handleWinnerClick(roundIndex, matchIndex, match.team1)
                        }
                      >
                        <p className="font-medium text-center break-all">
                          {match.team1}
                        </p>
                      </div>
                      <div className="text-gray-500 font-medium text-center">
                        vs
                      </div>
                      <div
                        className={`rounded-lg border-l-4 cursor-pointer hover:bg-blue-100 transition-colors p-3 ${
                          match.winner === match.team2
                            ? "border-green-500 bg-green-50"
                            : "border-blue-500 bg-white"
                        }`}
                        onClick={() =>
                          handleWinnerClick(roundIndex, matchIndex, match.team2)
                        }
                      >
                        <p className="font-medium text-center break-all">
                          {match.team2 === "Bye" ? (
                            <span className="text-gray-400">Bye</span>
                          ) : (
                            match.team2
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        ) : (
          <div className="flex justify-center space-x-8 min-w-max">
            {matches.map((round, roundIndex) => (
              <div
                key={roundIndex}
                className="flex flex-col items-center space-y-6"
              >
                <h3 className="text-xl font-semibold text-center">
                  Round {roundIndex + 1}
                </h3>
                <div className="flex flex-col justify-center space-y-6 h-full">
                  {round.map((match, matchIndex) => (
                    <div key={matchIndex} className="flex items-center gap-4">
                      <div
                        className={`rounded-lg border-l-4 cursor-pointer hover:bg-blue-100 transition-colors w-40 h-16 ${
                          match.winner === match.team1
                            ? "border-green-500 bg-green-50"
                            : "border-blue-500 bg-gray-50"
                        } flex items-center justify-center`}
                        onClick={() =>
                          handleWinnerClick(roundIndex, matchIndex, match.team1)
                        }
                      >
                        <p className="font-medium text-center break-all w-full">
                          {match.team1}
                        </p>
                      </div>
                      <div className="text-gray-500 font-medium">vs</div>
                      <div
                        className={`rounded-lg border-l-4 cursor-pointer hover:bg-blue-100 transition-colors w-40 h-16 ${
                          match.winner === match.team2
                            ? "border-green-500 bg-green-50"
                            : "border-blue-500 bg-gray-50"
                        } flex items-center justify-center`}
                        onClick={() =>
                          handleWinnerClick(roundIndex, matchIndex, match.team2)
                        }
                      >
                        <p className="font-medium text-center break-all w-full">
                          {match.team2 === "Bye" ? (
                            <span className="text-gray-400">Bye</span>
                          ) : (
                            match.team2
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
