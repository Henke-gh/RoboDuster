function doDamage(fighter) {
  let damage =
    Math.floor(Math.random() * (fighter.weapon.maxDmg - fighter.weapon.minDmg + 1)) + fighter.weapon.minDmg;
  return damage;
}

function deathCheck(fighter, combatLog) {
  if (fighter.currentHp > 0) {
    return false;
  }
  let newLine = document.createElement("p");
  newLine.style.fontStyle = "italic";
  newLine.textContent = `${fighter.name} crumbles..`;
  combatLog.append(newLine);

  newLine = document.createElement("p");
  newLine.textContent = `${fighter.name} lost!`;
  combatLog.append(newLine);
  return true;
}

function makeAttack(attacker, defender, combatLog) {
  let damage = doDamage(attacker);
  let newLine = document.createElement("p");
  newLine.textContent = `${attacker.name} ${attacker.attackText} ${defender.name} with ${attacker.weapon.name}..`;
  combatLog.append(newLine);
  newLine = document.createElement("p");
  newLine.textContent = `${defender.name} is hit for ${damage} pts of damage!`;
  combatLog.append(newLine);
  defender.currentHp -= damage;
}

function combatRound(turn, attacker, defender, combatLog) {
  let initiative = Math.floor(Math.random() * 2) + 1;
  let round = turn;

  if (initiative === 1) {
    let newLine = document.createElement("p");
    newLine.style.fontWeight = "bold";
    newLine.textContent = `[Round ${round}]: ${attacker.name} goes first.`;
    combatLog.append(newLine);
    makeAttack(attacker, defender, combatLog);

    if (deathCheck(defender, combatLog)) return;

    makeAttack(defender, attacker, combatLog);

    if (deathCheck(attacker, combatLog)) return;
  }

  if (initiative === 2) {
    let newLine = document.createElement("p");
    newLine.style.fontWeight = "bold";
    newLine.textContent = `[Round ${round}]: ${defender.name} goes first.`;
    combatLog.append(newLine);

    makeAttack(defender, attacker, combatLog);

    if (deathCheck(attacker, combatLog)) return;

    makeAttack(attacker, defender, combatLog);

    if (deathCheck(defender, combatLog)) return;
  }

  round++;
  return round;
}

export { doDamage, makeAttack, deathCheck, combatRound };
