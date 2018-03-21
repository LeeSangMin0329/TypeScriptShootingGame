var Fps = 60;
var PercentageCreateEnemy = 50; // 10 ~ 100  more less, more enemy
var ScreenHeight = 800;
var ScreenWidth = 500;
var PoolingEnemyCount = 5;
var Canvas = document.getElementById('Canvas');
var Context = Canvas.getContext("2d");
var BackGround = /** @class */ (function () {
    function BackGround() {
        this._backImgYPos1 = 0;
        this._backImgYPos2 = -ScreenHeight;
        this._scrollSpeed = 10;
        this._backImg = new Image();
        this._backImg.src = "images/backBg.jpg";
    }
    BackGround.prototype.BackScroll = function () {
        Context.drawImage(this._backImg, 0, this._backImgYPos1, ScreenWidth, ScreenHeight);
        Context.drawImage(this._backImg, 0, this._backImgYPos2, ScreenWidth, ScreenHeight);
        this._backImgYPos1 += this._scrollSpeed;
        this._backImgYPos2 += this._scrollSpeed;
        if (this._backImgYPos1 >= ScreenHeight) {
            this._backImgYPos1 = -ScreenHeight;
            this._backImgYPos2 = 0;
        }
        if (this._backImgYPos2 >= ScreenHeight) {
            this._backImgYPos2 = -ScreenHeight;
            this._backImgYPos1 = 0;
        }
    };
    return BackGround;
}());
// enemy img src
var EnemyImgSrc = 'images/무냐.png';
var Enemy = /** @class */ (function () {
    function Enemy() {
        this._enemyImg = new Image();
        this._isDead = true;
        this._moveSpeed = 10;
        this._enemyImg.src = EnemyImgSrc; // do you random if other img src exist;
        var randomNum = Math.floor(Math.random() * 5);
        this._xPos = ScreenWidth * 0.1 * randomNum;
        this._yPos = -50;
    }
    Enemy.prototype.Init = function () {
        this._isDead = false;
        var randomNum = Math.floor(Math.random() * 9);
        this._xPos = ScreenWidth * 0.1 * randomNum;
        this._yPos = -50;
    };
    Enemy.prototype.IsDead = function () {
        return this._isDead;
    };
    Enemy.prototype.MoveEnemy = function () {
        if (!this._isDead) {
            this._yPos += this._moveSpeed;
            if (this._yPos >= ScreenHeight + 50) {
                this._isDead = true;
            }
        }
    };
    Enemy.prototype.Draw = function () {
        if (!this._isDead) {
            Context.drawImage(this._enemyImg, this._xPos, this._yPos, 100, 100);
        }
    };
    return Enemy;
}());
//# sourceMappingURL=app.js.map