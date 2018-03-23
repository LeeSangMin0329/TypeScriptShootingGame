var Bullet = /** @class */ (function () {
    function Bullet() {
        this._moveSpeed = Common.BulletSpeed;
        this.IsDead = true;
        this._img = new Image();
        this._img.src = "images/bullet.png";
        this._height = 50;
        this._width = 50;
    }
    Bullet.prototype.XPos = function () { return this._xPos; };
    Bullet.prototype.YPos = function () { return this._yPos; };
    Bullet.prototype.Height = function () { return this._height; };
    Bullet.prototype.Width = function () { return this._width; };
    Bullet.prototype.Init = function (xPos, yPos) {
        this._xPos = xPos;
        this._yPos = yPos;
        this.IsDead = false;
    };
    Bullet.prototype.MoveBullet = function () {
        if (!this.IsDead) {
            this._yPos -= this._moveSpeed;
            if (this._yPos <= -40) {
                this.IsDead = true;
            }
        }
    };
    Bullet.prototype.Draw = function () {
        if (!this.IsDead) {
            Common.DrawContext(this._img, this._xPos, this._yPos, this._width, this._height);
        }
    };
    return Bullet;
}());
//# sourceMappingURL=Bullet.js.map