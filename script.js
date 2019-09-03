let doorImage1 = document.getElementById("door1");
let doorImage2 = document.getElementById("door2");
let doorImage3 = document.getElementById("door3");
let messageButton = document.getElementById("message");
let tryAgainButton = document.getElementById('try-again');
let audioDoor = document.getElementById('audio-door');
let audioKiller = document.getElementById('audio-killer');


let killerDoor = "./img/blue-door-killer.png"
let friendDoor = "./img/blue-door-friend.png"
let exitDoor = "./img/blue-door-exit.png"
let closedDoor = "./img/blue-door.png"
let currentlyPlaying = true;

let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;

const playDoor = (door) => {
  numClosedDoors--;
  if(numClosedDoors === 2 && isExit(door)) {
    messageButton.innerHTML = "This is the exit but first find you must find your friend."
  } else if(isFriend(door) && numClosedDoors === 2) {
    messageButton.innerHTML = "Your friend is alive, hurry up."
  } else if(numClosedDoors === 1 && !isKilled(door)) {
    console.log(isFriend(door), isExit(door))
    gameOver("win");
  } else if(isKilled(door)) {
    gameOver();
  }
}

function isKilled(door) {
  return door.name === killerDoor ? true : false;
}
function isExit(door) {
  return door.name === exitDoor ? true : false;
}
function isFriend(door) {
  return door.name === friendDoor ? true : false;
}

function isClicked(door) {
  return door.name === closedDoor ? false : true;
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

doorImage1.onclick = () => {
  if(!isClicked(doorImage1) && currentlyPlaying) {
  audioDoor.play();
  doorImage1.src=openDoor1;
  doorImage1.name=openDoor1;
  playDoor(doorImage1);
  }
}
doorImage2.onclick = () => {
  if(!isClicked(doorImage2) && currentlyPlaying) {
  audioDoor.play();
  doorImage2.src=openDoor2;
  doorImage2.name=openDoor2;
  playDoor(doorImage2);
  }
}
doorImage3.onclick = () => {
  if(!isClicked(doorImage3) && currentlyPlaying) {
  audioDoor.play();
  doorImage3.src=openDoor3;
  doorImage3.name=openDoor3;
  playDoor(doorImage3);
  }
}

tryAgainButton.onclick = () => {
  if(!currentlyPlaying) {
    startRound();
  }
}

function startRound() {
  doorImage1.src = closedDoor;
  doorImage2.src = closedDoor;
  doorImage3.src = closedDoor;
  doorImage1.name = closedDoor;
  doorImage2.name = closedDoor;
  doorImage3.name = closedDoor;
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
  blinkTryAgain()
  currentlyPlaying = false;
}

 startRound();


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
    startRound();
    tryAgainButton.style.visibility = 'hidden';
  }
}