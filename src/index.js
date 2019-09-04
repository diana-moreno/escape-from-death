let doorImage1 = document.getElementById("door1");
let doorImage2 = document.getElementById("door2");
let doorImage3 = document.getElementById("door3");
let messageButton = document.getElementById("message");
let tryAgainButton = document.getElementById('try-again');
let audioDoor = document.getElementById('audio-door');
let audioKiller = document.getElementById('audio-killer');

let killerDoor = "./img/white-door-killer.jpg"
let friendDoor = "./img/white-door-friend.png"
let exitDoor = "./img/white-door-exit.png"
let closedDoor1 = "./img/white-door-bloody-hand2.jpg"
let closedDoor2 = "./img/white-door-bloody-hand1.jpg"
let closedDoor3 = "./img/white-door-bloody-hand3.jpg"
let currentlyPlaying = true;

let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;

const playDoor = (door) => {
  numClosedDoors--;
  if(numClosedDoors === 2 && isExit(door)) {
    messageButton.innerHTML = "You can't leave your friend, find him!"
  } else if(isFriend(door) && numClosedDoors === 2) {
    messageButton.innerHTML = "Your friend is alive, hurry up finding the exit."
  } else if(numClosedDoors === 1 && !isKiller(door)) {
    gameOver("win");
  } else if(isKiller(door)) {
    gameOver();
  }
}

function isKiller(door) {
  return door.name === killerDoor ? true : false;
}
function isExit(door) {
  return door.name === exitDoor ? true : false;
}
function isFriend(door) {
  return door.name === friendDoor ? true : false;
}

function isClicked(door) {
  return door.name === closedDoor1 || closedDoor2 || closedDoor3 ? false : true;
}

const randomDoorGenerator = () => {
  const currentDoor = Math.floor(Math.random() * numClosedDoors);
  if(currentDoor === 0) {
    openDoor1 = killerDoor;
    openDoor2 = friendDoor;
    openDoor3 = exitDoor;
  } else if(currentDoor === 1) {
    openDoor2 = killerDoor;
    openDoor3 = friendDoor;
    openDoor1 = exitDoor;
  } else {
    openDoor3 = killerDoor;
    openDoor1 = friendDoor;
    openDoor2 = exitDoor;
  }
}

function openTheDoor(door, openDoorX) {
  if(!isClicked(door) && currentlyPlaying) {
    audioDoor.play();
    door.src=openDoorX;
    door.name=openDoorX;
    playDoor(door);
  }
}

doorImage1.onclick = () => openTheDoor(doorImage1, openDoor1)
doorImage2.onclick = () => openTheDoor(doorImage2, openDoor2)
doorImage3.onclick = () => openTheDoor(doorImage3, openDoor3)


tryAgainButton.onclick = () => {
  if(!currentlyPlaying)
    startGame();
}

// necesitamos trabajar con name porque src depende de la ruta local
function startGame() {
  doorImage1.src = closedDoor1;
  doorImage2.src = closedDoor2;
  doorImage3.src = closedDoor3;
  doorImage1.name = closedDoor1;
  doorImage2.name = closedDoor2;
  doorImage3.name = closedDoor3;
  numClosedDoors = 3;
  messageButton.innerHTML = 'Good luck...'
  tryAgainButton.style.visibility = 'hidden';
  currentlyPlaying = true;
  randomDoorGenerator();
}

function gameOver(status) {
  if(status === "win") {
    messageButton.innerHTML = "You and your friend have survived this time..."
  } else {
    audioKiller.play();
    messageButton.innerHTML = "The killer has found you...Game over."
  }
  tryAgainButton.style.visibility = 'visible';
  tryAgainButton.innerHTML = "Try again";
  currentlyPlaying = false;
  blinkTryAgain()
}

startGame();


function blinkTryAgain() {
  let blink = setInterval(BlinkIt, 500);
  let color = "red";

  function BlinkIt() {
    color = (color == "white")? "red" : "white";
    tryAgainButton.style.color = color;
  }
  tryAgainButton.onclick = function() {
    clearInterval(blink);
    tryAgainButton.style.color = 'white';
    startGame();
    tryAgainButton.style.visibility = 'hidden';
  }
}