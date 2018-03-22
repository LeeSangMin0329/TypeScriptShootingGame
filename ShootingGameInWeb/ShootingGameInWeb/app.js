var Common = /** @class */ (function () {
    function Common() {
    }
    Common.DrawContext = function (img, xPos, yPos, w, h) {
        Common.Context.drawImage(img, xPos, yPos, w, h);
    };
    Common.Fps = 60;
    Common.PercentageCreateEnemy = 50; // 10 ~ 100  more less, more enemy
    Common.ScreenHeight = 800;
    Common.ScreenWidth = 500;
    Common.PlayerMoveSpeed = 8;
    Common.BulletSpeed = 8;
    Common.PoolingEnemyCount = 5;
    Common.PoolingBulletCount = 10;
    Common.Canvas = document.getElementById('Canvas');
    Common.Context = Common.Canvas.getContext("2d");
    return Common;
}());
var BackGround = /** @class */ (function () {
    function BackGround() {
        this._backImgYPos1 = 0;
        this._backImgYPos2 = -Common.ScreenHeight;
        this._scrollSpeed = 10;
        this._backImg = new Image();
        this._backImg.src = "images/backBg.jpg";
    }
    BackGround.prototype.BackScroll = function () {
        Common.DrawContext(this._backImg, 0, this._backImgYPos1, Common.ScreenWidth, Common.ScreenHeight);
        Common.DrawContext(this._backImg, 0, this._backImgYPos2, Common.ScreenWidth, Common.ScreenHeight);
        this._backImgYPos1 += this._scrollSpeed;
        this._backImgYPos2 += this._scrollSpeed;
        if (this._backImgYPos1 >= Common.ScreenHeight) {
            this._backImgYPos1 = -Common.ScreenHeight;
            this._backImgYPos2 = 0;
        }
        if (this._backImgYPos2 >= Common.ScreenHeight) {
            this._backImgYPos2 = -Common.ScreenHeight;
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
        this._xPos = Common.ScreenWidth * 0.1 * randomNum;
        this._yPos = -50;
    }
    Enemy.prototype.Init = function () {
        this._isDead = false;
        var randomNum = Math.floor(Math.random() * 9);
        this._xPos = Common.ScreenWidth * 0.1 * randomNum;
        this._yPos = -50;
    };
    Enemy.prototype.IsDead = function () {
        return this._isDead;
    };
    Enemy.prototype.MoveEnemy = function () {
        if (!this._isDead) {
            this._yPos += this._moveSpeed;
            if (this._yPos >= Common.ScreenHeight + 50) {
                this._isDead = true;
            }
        }
    };
    Enemy.prototype.Draw = function () {
        if (!this._isDead) {
            Common.DrawContext(this._enemyImg, this._xPos, this._yPos, 100, 100);
        }
    };
    return Enemy;
}());
//# sourceMappingURL=app.js.map