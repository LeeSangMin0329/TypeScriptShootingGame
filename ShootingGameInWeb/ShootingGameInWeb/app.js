var Common = /** @class */ (function () {
    function Common() {
    }
    Common.DrawContext = function (img, xPos, yPos, w, h) {
        Common.Context.drawImage(img, xPos, yPos, w, h);
    };
    Common.DrawText = function (str, xPos, yPos) {
        Common.Context.fillText(str, xPos, yPos);
    };
    Common.Fps = 60;
    Common.PercentageCreateEnemy = 50; // 10 ~ 100  more less, more enemy
    Common.ScreenHeight = 800;
    Common.ScreenWidth = 500;
    Common.PlayerMoveSpeed = 8;
    Common.BulletSpeed = 8;
    Common.BulletDamage = 40;
    Common.PoolingEnemyCount = 5;
    Common.PoolingBulletCount = 10;
    Common.KeyPressOn = {};
    Common.Score = 0;
    Common.Canvas = document.getElementById('Canvas');
    Common.Context = Common.Canvas.getContext("2d");
    return Common;
}());
Common.Context.fillStyle = "white";
Common.Context.font = '20pt Arial';
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
//# sourceMappingURL=app.js.map