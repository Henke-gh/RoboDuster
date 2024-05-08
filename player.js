let player = {
  name: "Unbranded",
  maxHp: 100,
  currentHp: 100,
  credits: 0,
  armor: {
    name: "N/A",
    hpBoost: 0,
  },
  weapon: {
    name: "N/A",
    minDmg: 1,
    maxDmg: 2,
  },
  attackText: "takes a swing at",
};

const weapons = {
  spikedRebar: {
    name: "Spiked Rebar",
    minDmg: 5,
    maxDmg: 20,
  },
  deathRazor: {
    name: "Death Razors",
    minDmg: 10,
    maxDmg: 15,
  },
  turboLaser: {
    name: "Murder Rays",
    minDmg: 30,
    maxDmg: 32,
  },
  sledge: {
    name: "Proto-Sledge",
    minDmg: 2,
    maxDmg: 50,
  },
};

const armors = {
  sheetMetal: {
    name: "Sheet Metal",
    hpBoost: 20,
  },
  tankPlate: {
    name: "Tank Plating",
    hpBoost: 25,
  },
  barbing: {
    name: "Barbed Chassi",
    hpBoost: 10,
  },
  exoProto: {
    name: "Exo-Prototype",
    hpBoost: 45,
  },
};

export { player, weapons, armors };
