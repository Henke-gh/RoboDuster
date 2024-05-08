import robots from "./robots.js";
import { armors, player, weapons } from "./player.js";
import { combatRound } from "./combatFunctions.js";

let round = 1;

let attacker = player;
let attackerWins = 0;
let defender = robots.scrapbot;
let defenderWins = 0;
let soundOn = false;

function toggleSound() {
  soundOn = !soundOn;
  if (soundOn) {
    audioController.innerHTML = "Sound is On";
  } else {
    audioController.innerHTML = "Sound is Off";
  }
}

const audioController = document.getElementById("audioController");
audioController.addEventListener("click", toggleSound);

const weaponAudio = new Audio(
  "../audio/mixkit-martial-arts-fast-punch-2047.wav"
);
const armorAudio = new Audio("../audio/mixkit-metal-tool-drop-835.wav");

const combatZone = document.getElementById("combatZone");
const createBot = document.getElementById("createBot");
const continueBtn = document.getElementById("continue");
const weaponSelection = document.getElementById("weapons");
const armorSelection = document.getElementById("armor");

const nameInput = document.getElementById("playerName");

const previewHP = document.getElementById("playerHP");
const previewWeapon = document.getElementById("playerWeapon");
const previewArmor = document.getElementById("playerArmor");
const previewDmg = document.getElementById("playerDmg");
const viewCredits = document.getElementById("credits");

const versus = document.getElementById("versus");
const combatLog = document.getElementById("combatLog");
const fight = document.getElementById("fight");
const winRatio = document.getElementById("winRatio");

previewHP.innerHTML = `Hit Points: ${player.maxHp + player.armor.hpBoost}`;
previewWeapon.innerHTML = `Weapon: ${player.weapon.name}`;
previewArmor.innerHTML = `Armor: ${player.armor.name}`;
previewDmg.innerHTML = `Dmg: ${player.weapon.minDmg}-${player.weapon.maxDmg}`;
viewCredits.innerHTML = `Credits: ${player.credits}`;

combatZone.style.display = "none";

continueBtn.addEventListener("click", () => {
  player.name = nameInput.value;
  player.maxHp += player.armor.hpBoost;
  player.currentHp = player.maxHp;
  combatZone.style.display = "flex";
  createBot.style.display = "none";
  defender = randomOpponent(robots);
  versus.innerHTML = `${attacker.name} vs ${defender.name}`;
  winRatio.innerHTML = `[ Wins: ${attackerWins} ] - [ Losses: ${defenderWins} ]`;
});

//loop through all weapons to create select buttons and update player info on click
Object.keys(weapons).forEach((weapon, index) => {
  let newWeapon = document.createElement("button");
  newWeapon.textContent = weapons[weapon].name;
  newWeapon.id = `weapon${index}`;

  //closure function to capture weapon information to button
  //Update player preview with new stats
  (function (currentWeapon) {
    newWeapon.addEventListener("click", () => {
      player.weapon = weapons[currentWeapon];
      previewWeapon.innerHTML = `Weapon: ${player.weapon.name}`;
      previewDmg.innerHTML = `Dmg: ${player.weapon.minDmg}-${player.weapon.maxDmg}`;
      if (soundOn) {
        weaponAudio.pause();
        weaponAudio.currentTime = 0;
        weaponAudio.play();
      }
    });
  })(weapon);

  weaponSelection.append(newWeapon);
});

//loop through all armors to create select buttons and update player info on click
Object.keys(armors).forEach((armor, index) => {
  let newArmor = document.createElement("button");
  newArmor.textContent = armors[armor].name;
  newArmor.id = `armor${index}`;

  //Update player preview with new stats
  (function (currentArmor) {
    newArmor.addEventListener("click", () => {
      player.armor = armors[currentArmor];
      previewArmor.innerHTML = `Armor: ${player.armor.name}`;
      previewHP.innerHTML = `Hit Points: ${
        player.maxHp + player.armor.hpBoost
      }`;
      if (soundOn) {
        armorAudio.pause();
        armorAudio.currentTime = 0;
        armorAudio.play();
      }
    });
  })(armor);
  armorSelection.append(newArmor);
});

const nextRoundBtn = document.createElement("button");
nextRoundBtn.textContent = "Next Round";
nextRoundBtn.addEventListener("click", () => {
  round = nextRound(round, attacker, defender);
});

const clearLogBtn = document.createElement("button");
clearLogBtn.textContent = "Rebuild Bot";
clearLogBtn.addEventListener("click", () => {
  round = 1;
  player.maxHp = 100;
  viewCredits.innerHTML = `Credits: ${player.credits}`;
  combatLog.innerHTML = "<div class=block></div>";
  combatZone.style.display = "none";
  createBot.style.display = "flex";
  fight.style.display = "block";
});

document.addEventListener("DOMContentLoaded", () => {
  versus.innerHTML = `${attacker.name} vs ${defender.name}`;
});

fight.addEventListener("click", () => {
  fight.style.display = "none";
  defender.currentHp = defender.maxHp;
  runSimulation(attacker, defender);
});

function runSimulation(attacker, defender) {
  combatLog.innerHTML = "";

  round = combatRound(round, attacker, defender, combatLog);

  if (!gameOver(attacker, defender)) {
    combatLog.append(document.createElement("br"));
    combatLog.append(nextRoundBtn);
  }

  combatLog.append(document.createElement("br"));
  combatLog.append(clearLogBtn);

  winRatio.innerHTML = `[ Wins: ${attackerWins} ] - [ Losses: ${defenderWins} ]`;
}

function nextRound(round, attacker, defender) {
  combatLog.innerHTML = "";

  round = combatRound(round, attacker, defender, combatLog);

  if (!gameOver(attacker, defender)) {
    combatLog.append(document.createElement("br"));
    combatLog.append(nextRoundBtn);
  }

  combatLog.append(document.createElement("br"));
  combatLog.append(clearLogBtn);

  return round;
}

function gameOver(attacker, defender) {
  if (attacker.currentHp > 0 && defender.currentHp > 0) {
    return false;
  }

  if (attacker.currentHp <= 0) {
    defenderWins++;
    winRatio.innerHTML = `[ Wins: ${attackerWins} ] - [ Losses: ${defenderWins} ]`;
    return true;
  }

  if (defender.currentHp <= 0) {
    attackerWins++;
    attacker.credits += 50;
    winRatio.innerHTML = `[ Wins: ${attackerWins} ] - [ Losses: ${defenderWins} ]`;
    return true;
  }
}

function randomOpponent(robots) {
  let opponentIndex = Math.floor(Math.random() * 3) + 1;

  if (opponentIndex === 1) {
    return robots.killbot;
  }

  if (opponentIndex === 2) {
    return robots.scrapbot;
  }

  return robots.challenger;
}
