class ObstacleBottom {
    constructor(gameScreen, obstacleImages) {
        this.gameScreen = gameScreen;
        this.left = 100;
        this.top = 400;
        this.width = 70;
        this.height = 100;
        this.obstacleImages = obstacleImages;

        this.element = document.createElement("img");
        this.element.src = this.getRandomObstacleImage();

        this.element.style.position = "absolute";
        this.element.style.top = `${this.top}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.width = `${this.width}px`;

        this.gameScreen.appendChild(this.element);
    }
    
    getRandomObstacleImage() {
        const randomIndex = Math.floor(Math.random() * this.obstacleImages.length);
        return this.obstacleImages[randomIndex];
    } // random images function

    updatePosition() {
        this.element.style.left = `${this.left}px`;
    }

    move() {
        this.left += 10;
        this.updatePosition();
    }

    collidedWithPlayer(player) {
        const playerRect = player.element.getBoundingClientRect();
        const obstacleRect = this.element.getBoundingClientRect();

        if (
            playerRect.left < obstacleRect.right &&
            playerRect.right > obstacleRect.left &&
            playerRect.top < obstacleRect.bottom &&
            playerRect.bottom > obstacleRect.top
        ) {
            return true;
        }

        return false;
    }
}