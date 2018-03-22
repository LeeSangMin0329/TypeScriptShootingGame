var Bullet = /** @class */ (function () {
    function Bullet() {
        this._isDead = true;
        this._moveSpeed = Common.BulletSpeed;
        this._img = new Image();
        this._img.src = "images/bullet.png";
        this._height = 50;
        this._width = 50;
    }
    Bullet.prototype.Init = function (xPos, yPos) {
        this._xPos = xPos;
        this._yPos = yPos;
        this._isDead = false;
    };
    Bullet.prototype.IsDead = function () {
        return this._isDead;
    };
    Bullet.prototype.MoveBullet = function () {
        if (!this._isDead) {
            this._yPos -= this._moveSpeed;
            if (this._yPos <= -40) {
                this._isDead = true;
            }
        }
    };
    Bullet.prototype.Draw = function () {
        if (!this._isDead) {
            Common.DrawContext(this._img, this._xPos, this._yPos, this._width, this._height);
        }
    };
    return Bullet;
}());
//# sourceMappingURL=Bullet.js.map