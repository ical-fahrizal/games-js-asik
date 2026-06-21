const RANKS = [
  {
    name: "★ Cadet",
    ai: 1,
    winNeed: 1,
  },
  {
    name: "★★ Scout",
    ai: 2,
    winNeed: 1,
  },
  {
    name: "★★★ Warrior",
    ai: 3,
    winNeed: 1,
  },
  {
    name: "★★★★ Commander",
    ai: 4,
    winNeed: 1,
  },
  {
    name: "★★★★★ Prime",
    ai: 5,
    winNeed: 999,
  },
];

function playerWin() {
  if (rank < RANKS.length - 1) {
    rank++;

    alert("Promosi!\n" + RANKS[rank].name);
  }

  updateStatus();
}

function cpuWin() {
  if (rank > 0) {
    rank--;

    alert("Turun Rank!\n" + RANKS[rank].name);
  }

  updateStatus();
}
