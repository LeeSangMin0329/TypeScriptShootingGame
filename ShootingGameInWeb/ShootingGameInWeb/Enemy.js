// enemy img src
var EnemyImgSrc = 'images/무냐.png';
var EnemyHP = 100;
var Enemy = /** @class */ (function () {
    function Enemy() {
        this._enemyImg = new Image();
        this._moveSpeed = 10;
        this.IsDead = true;
        this._enemyImg.src = EnemyImgSrc; // do you random if other img src exist;
        var randomNum = Math.floor(Math.random() * 5);
        this._xPos = Common.ScreenWidth * 0.1 * randomNum;
        this._yPos = -50;
        this._height = 100;
        this._width = 100;
        this._hp = EnemyHP;
    }
    Enemy.prototype.XPos = function () { return this._xPos; };
    Enemy.prototype.YPos = function () { return this._yPos; };
    Enemy.prototype.Height = function () { return this._height; };
    Enemy.prototype.Width = function () { return this._width; };
    // if enemy dead, return true
    Enemy.prototype.Damage = function (amount) {
        this._hp -= amount;
        if (this._hp <= 0) {
            this.IsDead = true;
            return true;
        }
        return false;
    };
    Enemy.prototype.Init = function () {
        this.IsDead = false;
        var randomNum = Math.floor(Math.random() * 9);
        this._xPos = Common.ScreenWidth * 0.1 * randomNum;
        this._yPos = -50;
        this._hp = EnemyHP;
    };
    Enemy.prototype.MoveEnemy = function () {
        if (!this.IsDead) {
            this._yPos += this._moveSpeed;
            if (this._yPos >= Common.ScreenHeight + 50) {
                this.IsDead = true;
            }
        }
    };
    Enemy.prototype.Draw = function () {
        if (!this.IsDead) {
            Common.DrawContext(this._enemyImg, this._xPos, this._yPos, this._width, this._height);
        }
    };
    return Enemy;
}());
//# sourceMappingURL=Enemy.js.map