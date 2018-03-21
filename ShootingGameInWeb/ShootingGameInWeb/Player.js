var Player = /** @class */ (function () {
    function Player() {
        this._imgLangth = 4;
        this._imgIndex = 0;
        this._isDead = false;
        this._moveSpeed = 3;
        this._img = new Array(this._imgLangth);
        for (var i = 0; i < this._img.length; i++) {
            this._img[i] = new Image();
            this._img[i].src = "images/player0" + i + ".png";
        }
        this._xPos = ScreenWidth / 2;
        this._yPos = ScreenHeight * 0.8;
        this._count = 0;
    }
    Player.prototype.Draw = function () {
        if (!this._isDead) {
            // every fps/4 loop change img sprite
            this._count++;
            if (this._count >= Fps / this._imgLangth) {
                this._count = 0;
                this._imgIndex++;
                if (this._imgIndex >= this._imgLangth) {
                    this._imgIndex = 0;
                }
            }
            Context.drawImage(this._img[this._imgIndex], this._xPos, this._yPos, 100, 100);
        }
    };
    return Player;
}());
//# sourceMappingURL=Player.js.map