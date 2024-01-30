class Game {
	constructor() {
	  this.startScreen = document.getElementById("startScreen");
	  this.creditsScreen = document.getElementById("creditsScreen");
	  this.gameScreen = document.getElementById("gameScreen");
	  this.gameEndScreen = document.getElementById("gameEndScreen");
	  this.victoryScreen = document.getElementById("victoryScreen");
  
	  //Alien
	  this.playerAlien = new Player(
		this.gameScreen,
		50,
		400,
		100,
		150,
		"/outerSpaceExplorer/images/alien.gif"
	  );
  
	  //Portal
	  this.portal = new Player(
		this.gameScreen,
		1050,
		400,
		300,
		200,
		"/outerSpaceExplorer/images/portal.gif"
	  );
  
	  //Human
	  this.human = new Player(
		this.gameScreen,
		300,
		400,
		100,
		150,
		"/outerSpaceExplorer/images/astronaut.gif"
	  );
  
	  // Obstacles
	  this.obstacleImages = [
		"/outerSpaceExplorer/images/duck.gif",
		"/outerSpaceExplorer/images/pillow.gif",
		"/outerSpaceExplorer/images/tequila.gif",
	  ];
	  this.obstacles = [];
	  this.isPushingObstacle = false;
  
	  // Round limiting
	  this.lives = 5;
	  this.timer = 0;
	  this.gameIsOver = false;
  
	}
  
	start() {
	  this.startScreen.style.display = "none";
	  this.gameScreen.style.display = "block";
  
	  // Round timer
	  let timer = document.getElementById("timer");
	  timer.innerHTML = `Round time: ${this.timer}`;
  
	  const updateTimer = () => {
		this.timer++;
		timer.innerHTML = `Round time: ${this.timer}`;
	  };
  
	  setInterval(() => {
		if (this.lives > 0 || didCollide(portal)) {
		  this.victoryGame();
		}
	  }, 60000);
  
	  setInterval(updateTimer, 600);
	  introMusic.pause();
	  //alienShooting.play();
  
	  // Start the game loop
	  this.gameLoop();
	}
  
	gameLoop() {
	  // Check if the game is over to interrupt the game loop
	  if (this.gameIsOver) {
		inGameMusic.pause();
		return;
	  }
  
	  this.update();
  
	  window.requestAnimationFrame(() => this.gameLoop());
	}
  
	update() {
	  let lives = document.getElementById("lives");
	  lives.innerHTML = `Lives: ${this.lives}`;
  
	  this.human.move();
  
	  console.log(this.obstacles);
	  for (let i = 0; i < this.obstacles.length; i++) {
		const obstacle = this.obstacles[i];
		obstacle.move();
		humanHovering.play();
  
		if (this.human.didCollide(obstacle)) {
  
		  obstacle.element.remove();		// Remove the obstacle's
		  this.obstacles.splice(i, 1);
  
		  this.lives--;
		  for (let i = 0; i < this.obstacles.length; i++) {
			const obstacle = this.obstacles[i];
			obstacle.move();
			if (this.obstacles[i] === "rubberDuck") {
			  duckVoice.play();
			} else if (this.obstacles[i] === "pillowHit") {
			  pillowHit.play();
			} else {
			  shotHit.play();
			}
		  }
		  console.log(obstacle);
  
  
		  // Update the displayed lives in the DOM
		  lives.innerHTML = `Lives: ${this.lives}`;
  
		  if (this.lives === 0) {
			this.endGame();
			inGameMusic.pause();
			humanHovering.pause();
		  }
		} else if (obstacle.left < 0) {
		  obstacle.element.remove(); // Remove the obstacle's
		  this.obstacles.splice(i, 1);
		}
	  }
	  if (this.timer < 30) {
		if (!this.obstacles.length && !this.isPushingObstacle) {
		  this.isPushingObstacle = true;
  
		  setTimeout(() => {
			  const newObstacle = new ObstacleBottom(
				  this.gameScreen,
				  this.obstacleImages
			  );
			  this.obstacles.push(newObstacle);
			  for (let i = 0; i < this.obstacles.length; i++) {
				  this.obstacles[i].getRandomObstacleImage();
			  }
			  this.isPushingObstacle = false;
			  }, 2000);
	  }
  
	  } else {
		  if (this.obstacles.length < 1 && !this.isPushingObstacle) {
			  this.isPushingObstacle = true;
  
		  setTimeout(() => {
			const newObstacle = new ObstacleBottom(
			  this.gameScreen,
			  this.obstacleImages
			);
			this.obstacles.push(newObstacle);
			for (let i = 0; i < this.obstacles.length; i++) {
			  this.obstacles[i].getRandomObstacleImage();
			}
			  this.isPushingObstacle = false;
			  }, 4000);
		  }
		  }
	  if (this.human.didCollide(this.portal)) {
		this.victoryGame();
	  }
	}
  
	// Getting variations of the obstacles
	getRandomObstacleImage() {
	  const randomIndex = Math.floor(Math.random() * this.obstacleImages.length);
	  return this.obstacleImages[randomIndex];
	}
  
	victoryGame() {
	  this.portal.element.remove();
	  this.obstacles.forEach((obstacle) => {
		obstacle.element.remove();
	  });
  
	  this.gameIsOver = true;
  
	  this.gameScreen.style.display = "none";
	  this.victoryScreen.style.display = "block";
  
	  inGameMusic.pause();
	  humanHovering.pause();
	  victoryMusic.play();
	}
  
	endGame() {
	  this.human.element.remove();
	  this.portal.element.remove();
	  this.obstacles.forEach((obstacle) => {
		obstacle.element.remove();
		inGameMusic.pause();
		humanDead.play();
		humanHovering.pause();
	  });
  
	  this.gameIsOver = true;
  
	  this.gameScreen.style.display = "none";
	  this.gameEndScreen.style.display = "block";
	}
  }