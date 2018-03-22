var Player = /** @class */ (function () {
    function Player() {
        this._imgLangth = 4;
        this._imgIndex = 0;
        this._isDead = false;
        this._img = new Array(this._imgLangth);
        for (var i = 0; i < this._img.length; i++) {
            this._img[i] = new Image();
            this._img[i].src = "images/player0" + i + ".png";
        }
        this._xPos = Common.ScreenWidth / 2;
        this._yPos = Common.ScreenHeight * 0.8;
        this._count = 0;
        this._height = 100;
        this._width = 100;
        // bullet
        this._bulletList = new Array();
        for (var i = 0; i < Common.PoolingBulletCount; i++) {
            this._bulletList.push(new Bullet());
        }
    }
    Player.prototype.Draw = function () {
        // bullet 
        for (var i = 0; i < this._bulletList.length; i++) {
            this._bulletList[i].Draw();
        }
        if (!this._isDead) {
            // every fps/4 loop change img sprite
            this._count++;
            if (this._count >= Common.Fps / this._imgLangth) {
                this._count = 0;
                this._imgIndex++;
                if (this._imgIndex >= this._imgLangth) {
                    this._imgIndex = 0;
                }
            }
            Common.DrawContext(this._img[this._imgIndex], this._xPos, this._yPos, this._width, this._height);
        }
    };
    Player.prototype.Update = function () {
        // bullet
        if (this._count >= Common.Fps / this._imgLangth - 2) {
            for (var i = 0; i < this._bulletList.length; i++) {
                if (this._bulletList[i].IsDead()) {
                    this._bulletList[i].Init(this._xPos + this._img[0].height / 2, this._yPos + this._img[0].width / 2);
                    break;
                }
            }
        }
        for (var i = 0; i < this._bulletList.length; i++) {
            this._bulletList[i].MoveBullet();
        }
    };
    Player.prototype.Move = function (xDist, yDist) {
        this._xPos += xDist;
        this._yPos += yDist;
    };
    return Player;
}());
//# sourceMappingURL=Player.js.map