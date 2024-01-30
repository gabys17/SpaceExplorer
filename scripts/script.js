window.onload = function () {
    const startButton = document.getElementById("button-start");
    const creditsButton = document.getElementById("button-credits");
    const creditsScreen = document.getElementById("creditsScreen");
    const buttonHelp = document.getElementById("button-help");
    const buttonMusicOnOff = document.getElementById("button-music-on-off");
    const helpReturnButton = document.getElementById("helpScreen-return-button");
    const inGameMusic = document.getElementById("inGameMusic");
    const introMusic = document.getElementById("introMusic");
    const alienShooting = document.getElementById("alienShooting");
    const humanDead = document.getElementById("humanDead");
    const humanRunning = document.getElementById("humanRunning");
    const duckVoice = document.getElementsByName("rubberDuck");
    const pillowHit = document.getElementsByName("pillowHit");
    const shotHit = document.getElementsByName("shotHit");
    const victoryMusic = document.getElementById("victory-music");

    startButton.addEventListener("click", function () {
      startGame();
      inGameMusic.play();
      inGameMusic.currentTime = 0; 
      introMusic.pause();
    });
    
    let game;

    buttonHelp.addEventListener("click", function() {
      helpScreen.style.display = "block";
    })

    let isMusicPlaying = false;

    function toggleMusic(){
      if (isMusicPlaying){
        introMusic.pause();
        buttonMusicOnOff.style.backgroundImage = "url('https://i.ibb.co/dbbYn9V/mute.png')";
        
      } else {
        introMusic.play();
        buttonMusicOnOff.style.backgroundImage = "url('https://i.ibb.co/BBYZvy0/music-on-off.png')";
      }
      isMusicPlaying=!isMusicPlaying;
    }

    document.getElementById("button-music-on-off").addEventListener("click", toggleMusic);

    helpReturnButton.addEventListener("click", function() {
      helpScreen.style.display = "none";
    })
  
    creditsButton.addEventListener("click", function() {
      startScreen.style.display = "none";      
      creditsScreen.style.display = "block";
      inGameMusic.pause();
      humanRunning.pause();
    })

    const returnButton = document.querySelector(".return-arrow")
    returnButton.addEventListener("click", function () {
      creditsScreen.style.display = "none";
      startScreen.style.display = "block";
      inGameMusic.pause();
      humanRunning.pause();//arrumar aqui
      restartGame();
    })

    let returnStartMenu = document.querySelector(".button-return-startScreen")
    returnStartMenu.addEventListener("click", function () {
      gameEndScreen.style.display = "none";
      startScreen.style.display = "block";
      restartGame()
      inGameMusic.pause();
    })

    const returnStartMenuFromVictory = document.querySelector(".button-return-startScreen-2")
    returnStartMenuFromVictory.addEventListener("click", function () {
      victoryScreen.style.display = "none";
      startScreen.style.display = "block";
      inGameMusic.pause();
      restartGame();
    })


    function restartGame(){
      location.reload();
      inGameMusic.pause();
    }
    
    function startGame() {
        game = new Game();
    
        game.start();        
    }
    
    function handleKeyDown (event) {
       const playerImage = document.getElementById("player");
        const key = event.key;
        const possibleKeystrokes = [
            "ArrowLeft",
            "ArrowUp",
            "ArrowRight",

        ]
    
        // Check if the pressed key belong to the array of possible keys
        if (possibleKeystrokes.includes(key)) {
          // prevent the default actions from happening
          event.preventDefault();
    
            if (game) {
              switch (key) {
                  case "ArrowLeft":
                      game.human.directionX = -8;
                      game.human.facingDirection = "left";
                      humanRunning.play();//arrumar aqui
                      break;
                  case "ArrowRight":
                      game.human.directionX = 8;
                      game.human.facingDirection = "right";
                      humanRunning.play();
                      break;
                  case "ArrowUp":
                      if (game.human.top > 389){
                        game.human.jump();
                        humanRunning.play();
                        break;
                      }
                      
                      break;
              }
             // game.human.updatePlayerImage();
          }
        }
      }
    
      function handleKeyUp (event) {
        const key = event.key;
        const possibleKeystrokes = [
            "ArrowLeft",
            "ArrowUp",
            "ArrowRight"
        ]
    
        if (game) {
          switch (key) {
              case "ArrowLeft":
              case "ArrowRight":
                  game.human.directionX = 0;
                  game.human.facingDirection = "idle";
                  humanRunning.pause();
                  break;
              case "ArrowUp":
                  game.human.directionY = 0;
                  humanRunning.pause();
                  break;
          }
            }
          }
      
      // Function that handles keyup (releasing the key) events
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
}