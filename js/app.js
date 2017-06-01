document.addEventListener('DOMContentLoaded', function () {

    for (var i = 0; i < 100; i++) {
        var boardElement = document.createElement('div');
        var gameBoard = document.getElementById('board');
        gameBoard.appendChild(boardElement);
    }

    function Furry () {
        this.x = 0;
        this.y = 0;
        this.direction = 'right';
    }

    function Coin () {
        this.randomizePosition = function () {
            this.x = Math.floor(Math.random() * 10);
            this.y = Math.floor(Math.random() * 10);
        }
    }

    function Game() {
        var self = this;
        this.board = document.querySelectorAll('#board>div');
        this.furryGame = new Furry();
        this.coinGame = new Coin();
        this.score = 0;
        this.idSetInterval = null;
        this.index = function (x, y) {
            return x + (y * 10);
        };

        this.init = function () {
            this.furryGame.x = 0;
            this.furryGame.y = 0;
            this.furryGame.direction = 'right';
            this.score = 0;

            document.getElementById('score').style.visibility = 'visible';
            document.querySelector('#score>div>strong').innerText = '0';

            this.showFurry();
            this.showCoin();
            this.startGame();

        };

        this.showFurry = function () {
            this.board[this.index(this.furryGame.x, this.furryGame.y)].classList.add('mario');
        };

        this.hideVisibleFurry = function () {
            document.querySelector('.mario').classList.remove('mario');
        };

        this.showCoin = function () {
            this.coinGame.randomizePosition();
            this.board[this.index(this.coinGame.x, this.coinGame.y)].classList.add('coin');
        };


        this.moveFurry = function () {
            this.hideVisibleFurry();
            if(this.furryGame.direction === 'right') {
                this.furryGame.x = this.furryGame.x + 1;
            }
            else if (this.furryGame.direction === 'left') {
                this.furryGame.x = this.furryGame.x - 1;
            }
            else if (this.furryGame.direction === 'up') {
                this.furryGame.y = this.furryGame.y - 1;
            }
            else if (this.furryGame.direction === 'down') {
                this.furryGame.y = this.furryGame.y + 1;
            }
            this.checkCoinCollision();
            if (!this.checkFurryCollision()) {
                this.showFurry();
            }
        };

        this.turnFurry = function (event) {
            switch (event.which) {
                case 37:
                    this.furryGame.direction = 'left';
                    break;
                case 39:
                    this.furryGame.direction = 'right';
                    break;
                case 38:
                    this.furryGame.direction = 'up';
                    break;
                case 40:
                    this.furryGame.direction = 'down';
                    break;
            }
        };

        this.checkCoinCollision = function () {
            if (this.furryGame.x === this.coinGame.x && this.furryGame.y === this.coinGame.y) {
                document.querySelector('.coin').classList.remove('coin');
                this.scoreAdd(1);
                this.showCoin();
            }
        };


        this.scoreAdd = function (count) {
            this.score += count;
            document.querySelector('#score>div>strong').innerText = this.score;
            this.changeSpeed(this.score);
        };

        this.checkFurryCollision = function () {
            if((this.furryGame.x < 0 || this.furryGame.x > 9) || (this.furryGame.y < 0 || this.furryGame.y > 9)) {
                this.gameOver();
                return true;
            }
            return false;
        };

        this.gameOver = function () {
            clearInterval(self.idSetInterval);
            document.querySelector('.coin').classList.remove('coin');
            document.getElementById('game-over').style.visibility = 'visible';
            document.querySelector('#game-over-score>span').innerText = this.score;
            document.getElementById('score').style.visibility = 'hidden';

        };

        this.startGame = function () {
            return self.idSetInterval = setInterval(function() {
                self.moveFurry()
            }, 250);
        };

        this.changeSpeed = function (score) {
            var intervalPeriod = 250;

            if (score > 5 && score <= 10) {
                intervalPeriod = 200;
            }
            else if (score > 10) {
                intervalPeriod = 150;
            }

            clearInterval(self.idSetInterval);
            self.idSetInterval = setInterval(function() {
                self.moveFurry()
            }, intervalPeriod);
        }
    }

    var newGame = new Game();
    var startButton = document.getElementById('start-game-button');

    startButton.addEventListener('click', function () {
        document.getElementById('start-game').style.visibility = 'hidden';

        newGame.init();
    });


    document.addEventListener('keydown', function (event) {
        newGame.turnFurry(event);
    });


    var restartButton = document.getElementById('play-again');

    restartButton.addEventListener('click', function (event) {
        document.getElementById('game-over').style.visibility = 'hidden';
        newGame.init();
    });

});