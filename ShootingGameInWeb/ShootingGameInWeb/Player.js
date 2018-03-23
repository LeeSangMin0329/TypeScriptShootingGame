var Player = /** @class */ (function () {
    function Player() {
        this._imgLangth = 4;
        this._imgIndex = 0;
        this.IsDead = false;
        this._img = new Array(this._imgLangth);
        for (var i = 0; i < this._img.length; i++) {
            this._img[i] = new Image();
            this._img[i].src = "images/player0" + i + ".png";
        }
        this._xPos = Common.ScreenWidth / 2;
        this._yPos = Common.ScreenHeight * 0.8;
        this._count = 0;
        this._bCount = 0;
        this._height = 100;
        this._width = 100;
        // bullet
        this._bulletList = new Array();
        for (var i = 0; i < Common.PoolingBulletCount; i++) {
            this._bulletList.push(new Bullet());
        }
    }
    Player.prototype.XPos = function () { return this._xPos; };
    Player.prototype.YPos = function () { return this._yPos; };
    Player.prototype.Height = function () { return this._height; };
    Player.prototype.Width = function () { return this._width; };
    Player.prototype.BulletList = function () { return this._bulletList; };
    Player.prototype.Draw = function () {
        // bullet 
        for (var i = 0; i < this._bulletList.length; i++) {
            this._bulletList[i].Draw();
        }
        if (!this.IsDead) {
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
        if (!this.IsDead) {
            this.CalcKeyInput();
            // Make bullet
            this._bCount++;
            if (this._bCount >= Common.Fps / this._imgLangth) {
                this._bCount = 0;
                for (var i = 0; i < this._bulletList.length; i++) {
                    if (this._bulletList[i].IsDead) {
                        this._bulletList[i].Init(this._xPos + this._img[0].height / 2, this._yPos + this._img[0].width / 2);
                        break;
                    }
                }
            }
        }
        // Move bullet
        for (var i = 0; i < this._bulletList.length; i++) {
            this._bulletList[i].MoveBullet();
        }
    };
    Player.prototype.CalcKeyInput = function () {
        if (Common.KeyPressOn["38"] && this._yPos >= -this._height / 2)
            this._yPos -= Common.PlayerMoveSpeed; //up
        if (Common.KeyPressOn["40"] && this._yPos <= Common.Canvas.height - this._height / 2)
            this._yPos += Common.PlayerMoveSpeed; //down
        if (Common.KeyPressOn["37"] && this._xPos >= -this._width / 2)
            this._xPos -= Common.PlayerMoveSpeed; //left
        if (Common.KeyPressOn["39"] && this._xPos <= Common.Canvas.width - this._width / 2)
            this._xPos += Common.PlayerMoveSpeed; //right
    };
    return Player;
}());
//# sourceMappingURL=Player.js.map