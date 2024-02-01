class Game {
  constructor() {
    this.startScreen = document.getElementById("startScreen");
    this.introMusic = document.getElementById("introMusic");
    this.creditsScreen = document.getElementById("creditsScreen");
    this.gameScreen = document.getElementById("gameScreen");
    this.gameEndScreen = document.getElementById("gameEndScreen");
    this.inGameMusic = document.getElementById("inGameMusic");
    this.victoryScreen = document.getElementById("victoryScreen");
    this.victoryMusic = document.getElementById("victory-music");
    this.humanDead = document.getElementById("humanDead");
    this.duckVoice = document.getElementById("rubberDuck");
    this.pillowHit = document.getElementById("pillowHit");
    this.shotHit = document.getElementById("shotHit");

    //Alien
    this.playerAlien = new Player(
      this.gameScreen,
      50,
      400,
      100,
      150,
      "docs/images/alien.gif"
    );

    //Portal
    this.portal = new Player(
      this.gameScreen,
      1050,
      400,
      300,
      200,
      "docs/images/portal.gif"
    );

    //Human
    this.human = new Player(
      this.gameScreen,
      300,
      400,
      100,
      150,
      "docs/images/astronaut.gif"
    );

    this.playerStop = false;

    // Obstacles
    this.obstacleImages = [
      "docs/images/duck.gif",
      "docs/images/pillow.gif",
      "docs/images/tequila.gif",
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

    setInterval(updateTimer, 1000);

    // Start the game loop
    this.gameLoop();
  }

  gameLoop() {
    // Check if the game is over to interrupt the game loop
    if (this.gameIsOver) {
      /*       this.inGameMusic.pause(); */
      return;
    }

    this.update();

    window.requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    let lives = document.getElementById("lives");

    if(this.playerStop === false){
    this.human.move();
    }

    // Loop to Iterate over Objects and Check if they Collided with a Human or Check if They Disappeared from the Background's Limits.

    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      obstacle.move();

      if (this.human.didCollide(obstacle)) {
        obstacle.element.remove(); // Remove the obstacle in the HTML
        this.obstacles.splice(i, 1); // Remove the obstacle in the JS

        this.lives--;
        if (obstacle.element.src.includes("duck.gif")) {
          this.duckVoice.play();
        } else if (obstacle.element.src.includes("pillow.gif")) {
          this.pillowHit.play();
          this.playerStop = true;
          setTimeout(() => {
            this.playerStop = false;
          }, 3000)
        } else if (obstacle.element.src.includes("tequila.gif")) {
          this.shotHit.play();
          this.human.directionX -=100;
          this.human.directionY = 0;
        }
      } else if (obstacle.left > this.gameScreen.offsetWidth) {
        obstacle.element.remove(); // Remove the obstacle's
        this.obstacles.splice(i, 1);
      }
    }

    // If there are no obstacles and if we're not in the process of pushing obstacles...
    if (!this.obstacles.length && !this.isPushingObstacle) {
      this.isPushingObstacle = true;

      setTimeout(() => {

        const newObstacle = new ObstacleBottom(
          this.gameScreen,
          this.obstacleImages

        );
        this.obstacles.push(newObstacle);
        this.isPushingObstacle = false;
      }, 2000);
    }

    // If Human Collides with Portal, we Win.
    if (this.human.didCollide(this.portal)) {
      this.victoryGame();
    }

    // Game is Over Condition
    if (this.timer === 60 || this.lives === 0) {
      this.gameIsOver = true;
      this.endGame();
    }

    // Lives innerHTML in the last to have the most updated info
    lives.innerHTML = `Lives: ${this.lives}`;
  }

  victoryGame() {
    this.portal.element.remove();
    this.obstacles.forEach((obstacle) => {
      obstacle.element.remove();
    });

    this.gameIsOver = true;

    this.gameScreen.style.display = "none";
    this.victoryScreen.style.display = "block";

    this.inGameMusic.pause();
    this.victoryMusic.play();
  }

  endGame() {
    this.human.element.remove();
    this.portal.element.remove();
    this.obstacles.forEach((obstacle) => {
      obstacle.element.remove();
    });

    this.inGameMusic.pause();
    this.humanDead.play();

    this.gameIsOver = true;

    this.gameScreen.style.display = "none";
    this.gameEndScreen.style.display = "block";
  }
}
