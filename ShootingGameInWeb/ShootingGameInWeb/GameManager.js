var GameManager = /** @class */ (function () {
    function GameManager() {
        this._enemyList = new Array();
        for (var i = 0; i < Common.PoolingEnemyCount; i++) {
            this._enemyList.push(new Enemy());
        }
        this._player = new Player();
        this._collsion = new Collision();
    }
    GameManager.prototype.EnemyMake = function () {
        this._randomNum = Math.floor(Math.random() * Common.PercentageCreateEnemy);
        if (this._randomNum != 10) {
            return;
        }
        for (var i = 0; i < this._enemyList.length; i++) {
            if (this._enemyList[i].IsDead) {
                this._enemyList[i].Init();
                break;
            }
        }
    };
    GameManager.prototype.EnemyUpdate = function () {
        for (var i = 0; i < this._enemyList.length; i++) {
            if (!this._enemyList[i].IsDead) {
                this._enemyList[i].MoveEnemy();
            }
        }
    };
    GameManager.prototype.EnemyDraw = function () {
        for (var i = 0; i < this._enemyList.length; i++) {
            if (!this._enemyList[i].IsDead) {
                this._enemyList[i].Draw();
            }
        }
    };
    GameManager.prototype.MainUpdate = function () {
        this._player.Update();
        this.EnemyMake();
        this.EnemyUpdate();
        // Collision
        this._collsion.CheckPlayerToEnemys(this._player, this._enemyList);
        this._collsion.CheckBulletToEnemys(this._player.BulletList(), this._enemyList);
    };
    GameManager.prototype.MainDraw = function () {
        this.EnemyDraw();
        this._player.Draw();
    };
    return GameManager;
}());
//# sourceMappingURL=GameManager.js.map