class Player {
    constructor(gameScreen,left,top,width,height,image,){
        this.gameScreen = gameScreen;
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
        this.directionX = 0;
        this.directionY = 0;
        this.gravity = 0;
        this.isJumping = false;

        this.image = image;
        this.element = document.createElement("div");
        this.element.style.position = "absolute";
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.playerImage = document.createElement("img");
        this.playerImage.src = this.image;
        this.playerImage.style.position = "absolute";
        this.playerImage.style.width = `${this.width}px`;
        this.playerImage.style.height = `${this.height}px`;
        this.element.appendChild(this.playerImage);
        this.gameScreen.appendChild(this.element);
    }
    
    move(){
        this.top += this.directionY;
        this.left += this.directionX;

        // Handling the top part
        if (this.top < 50) {
            this.top = 50;
        }
        else if (this.top >= 50 && this.isJumping){
            this.gravity +=1;
            this.top += this.gravity;
        }

        // Handling the bottom part
        if (this.top > 430 && this.isJumping) {
            this.top = 429;
            this.gravity = 0;
            this.isJumping = false;
        }

        if (this.left + this.width > this.gameScreen.offsetWidth) {
            this.left = this.gameScreen.offsetWidth - this.width;
        } else if (this.left < 0) {
            this.left = 0;
        }

        this.updatePosition();
    }

    updatePosition() {
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
    }

	
    jump(){
        this.gravity = -25;
        this.isJumping = true;
    }

    didCollide(obstacle) {
        const playerRect = this.element.getBoundingClientRect();
        const portalRect = obstacle.element.getBoundingClientRect();
        
        if (playerRect.left < portalRect.right && playerRect.right > portalRect.left && playerRect.top < portalRect.bottom && playerRect.bottom > portalRect.top) {
            return true;
        } else {
            return false;
        }
    }
}