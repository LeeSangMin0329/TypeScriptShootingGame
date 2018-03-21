var GameManager = /** @class */ (function () {
    function GameManager() {
        this._enemyList = new Array();
        for (var i = 0; i < PoolingEnemyCount; i++) {
            this._enemyList.push(new Enemy());
        }
    }
    GameManager.prototype.EnemyMake = function () {
        this._randomNum = Math.floor(Math.random() * PercentageCreateEnemy);
        if (this._randomNum != 10) {
            return;
        }
        for (var i = 0; i < this._enemyList.length; i++) {
            if (this._enemyList[i].IsDead()) {
                this._enemyList[i].Init();
                break;
            }
        }
    };
    GameManager.prototype.EnemyUpdate = function () {
        for (var i = 0; i < this._enemyList.length; i++) {
            if (!this._enemyList[i].IsDead()) {
                this._enemyList[i].MoveEnemy();
            }
        }
    };
    GameManager.prototype.EnemyDraw = function () {
        for (var i = 0; i < this._enemyList.length; i++) {
            if (!this._enemyList[i].IsDead()) {
                this._enemyList[i].Draw();
            }
        }
    };
    GameManager.prototype.MainUpdate = function () {
        this.EnemyMake();
        this.EnemyUpdate();
    };
    GameManager.prototype.MainDraw = function () {
        this.EnemyDraw();
    };
    return GameManager;
}());
//# sourceMappingURL=GameManager.js.map