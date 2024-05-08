const robots = {
  killbot: {
    name: "X-150",
    maxHp: 140,
    currentHp: 140,
    xp: 25,
    weapon: { name: "Slicer Blade", minDmg: 15, maxDmg: 20 },
    attackText: "slices into",
  },
  challenger: {
    name: "Buck-ET",
    maxHp: 130,
    currentHp: 130,
    xp: 10,
    weapon: { name: "Giant Claw-Hammer", minDmg: 14, maxDmg: 22 },
    attackText: "brutally bludgeons",
  },
  scrapbot: {
    name: "Scrapster-1",
    maxHp: 120,
    currentHp: 120,
    xp: 10,
    weapon: { name: "Spiked Oil Can", minDmg: 15, maxDmg: 24 },
    attackText: "swings wildly at",
  },
};

export default robots;
