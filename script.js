let lives = 3;
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["Palo"];

const place = document.getElementById('place');
const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const livesText = document.querySelector("#livesText");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const player = document.getElementById('player');
const enemy = document.getElementById('enemy');
const weapons = [
  { name: 'Palo', power: 5 },
  { name: 'Daga', power: 30 },
  { name: 'Martillo', power: 50 },
  { name: 'Espada', power: 100 }
];
const monsters = [
  {
    name: "Slime",
    level: 2,
    health: 15
  },
  {
    name: "Bestia",
    level: 8,
    health: 60
  },
  {
    name: "Dragon",
    level: 20,
    health: 300
  }
]
const locations = [
  {
    name: "Plaza Del Pueblo",
    "button text": ["Ir a la tienda", "Ir a la cueva", "Luchar contra el dragón"],
    "button functions": [goStore, goCave, fightDragon],
    text: "Estás en la plaza del pueblo. Verás un cartel que dice \"Tienda\"."
  },
  {
    name: "Tienda",
    "button text": ["10 de salud (10 de oro)", "Un arma (30 de oro)", "Ir a la plaza del pueblo"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "Estás en la tienda. ¿Qué quieres comprar?"
  },
  {
    name: "Cueva",
    "button text": ["Luchar VS Slime", "Luchar VS Bestia", "Ir a la plaza del pueblo"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "Estás en la cueva. ¿Que quieres hacer?"
  },
  {
    name: "Lucha",
    "button text": ["Atacar", "Esquivar", "Correr"],
    "button functions": [attack, dodge, goTown],
    text: "Estás luchando contra un monstruo."
  },
  {
    name: "kill monster",
    "button text": ["Ir a la plaza del pueblo", "Ir a la plaza del pueblo", "Ir a la plaza del pueblo"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'El monstruo grita "¡Arg!" mientras muere. Obtienes puntos de experiencia y encuentras oro.'
  },
  {
    name: "Derrota",
    "button text": ["¿REPETIR?", "¿REPETIR?", "¿REPETIR?"],
    "button functions": [restart, restart, restart],
    text: "Te has MUERTO. &#x2620;"
  },
  {
    name: "menosVida",
    "button text": ["¿Luchar VS Slime?", "¿Luchar VS Bestia?", "Ir a la plaza del pueblo"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "Te has MUERTO. &#x2620; Perdiste una vida, si pierdes todas perderas todo el proceso. Restamos el 15% de tu XP y el 25% de tu ORO"
  },
  { 
    name: "Victoria", 
    "button text": ["¿REPETIR?", "¿REPETIR?", "¿REPETIR?"], 
    "button functions": [restart, restart, restart], 
    text: "¡Derrotaste al dragón! ¡GANAS EL JUEGO! &#x1F389;" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Ir a la plaza del pueblo?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "Encontraste un Easter Egg. Seleccione un número de arriba. Se eligen al azar diez números entre 0 y 10, y si el número que eliges coincide con uno de los números aleatorios, ¡GANAS!."
  }
];

//Los dos atacan
function twoAttack() {
  player.style.left = '30%';
  player.style.bottom = '30%';
  enemy.style.right = '30%';
  enemy.style.top = '30%';

  setTimeout(() => {
    player.style.left = '0';
    player.style.bottom = '0';
    enemy.style.right = '0';
    enemy.style.top = '0';

  }, 1000);
}

//Solo el enemigo ataca
function enemyAttack() {
  enemy.style.right = '40%';
  enemy.style.top = '40%';

  setTimeout(() => {
    enemy.style.right = '0';
    enemy.style.top = '0';
  }, 1000);
}

//solo el jugador ataca
function playerAttack() {
  player.style.left = '40%';
  player.style.bottom = '40%';

  setTimeout(() => {
    player.style.left = '0';
    player.style.bottom = '0';
  }, 1000);
}

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
}

function goTown() {
  place.style.background = "url('img/lugar/pueblo.jpg')";
  update(locations[0]);
  text.style.background = "#0a0a23";
  place.style.display = "block";
  document.querySelector(".gameContainer").style.display = "none";
}

function goStore() {
  place.style.background = "url('img/lugar/Tiendas-D1.jpg')";
  update(locations[1]);
  place.style.display = "block";
  document.querySelector(".gameContainer").style.display = "none";
}

function goCave() {
  place.style.background = "url('img/lugar/campo(1).jpg')";
  update(locations[2]);
  place.style.display = "block";
  document.querySelector(".gameContainer").style.display = "none";
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "No tienes suficiente oro para comprar salud.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "Ahora tienes un " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " En tu inventario tienes: " + inventory;
    } else {
      text.innerText = "No tienes suficiente oro para comprar un arma.";
    }
  } else {
    text.innerText = "¡Ya tienes el arma más poderosa!";
    button2.innerText = "Vender arma (15 de oro.)";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "Vendiste un " + currentWeapon + ".";
    text.innerText += " En tu inventario tienes: " + inventory;
  } else {
    text.innerText = "!No puedes vender tu única arma.!";
  }
}

function fightSlime() {
  enemy.style.backgroundImage = "url('img/personajes/slime.gif')";
  text.style.background = "#0a0a23";
  fighting = 0;
  goFight();
}

function fightBeast() {
  enemy.style.backgroundImage = "url('img/personajes/enemy.png')";
  text.style.background = "#0a0a23";
  fighting = 1;
  goFight();
}

function fightDragon() {
  enemy.style.backgroundImage = "url('img/personajes/dragon.png')";
  text.style.background = "#0a0a23";
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
  place.style.display = "none";
  document.querySelector(".gameContainer").style.display = "block";
}

function attack() {
  text.innerText = "El " + monsters[fighting].name + " ataca.";
  text.innerText += " Lo atacas con tu " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1; 
    twoAttack();
  } else {
    playerAttack();
    text.innerText += "Lo evitó";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lessLife();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Tu " + inventory.pop() + " se rompió";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  enemyAttack();
  text.innerText = "Esquivas el ataque del " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  text.style.background = "#c70d0d";
  update(locations[5]);
}

function winGame() {
  update(locations[7]);
  place.style.display = "block";
  document.querySelector(".gameContainer").style.display = "none";
}

function lessLife() {
  lives --;
  xp = xp - Math.floor(xp * 0.15); 
  health = 75;
  gold = gold - Math.floor(gold * 0.25);
  text.style.background = "#c70d0d";
  livesText.innerText = lives;
  xpText.innerText = xp;
  healthText.innerText = health;
  goldText.innerText = gold;
  if (lives > 0) {
    update(locations[6]);
  } else {
    lose();
  } 
}

function restart() {
  lives = 3;
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["Palo"];
  livesText.innerText = lives;
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  text.style.background = "#0a0a23";
  goTown();
  place.style.display = "block";
  document.querySelector(".gameContainer").style.display = "none";
}

function easterEgg() {
  update(locations[8]);
  document.querySelector(".gameContainer").style.display = "none";
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "Elegiste el " + guess + ". Aquí están los números aleatorios.:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "¡Bien! ¡Ganas 20 de oro!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "¡Equivocado! ¡Pierdes 10 de salud!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}
