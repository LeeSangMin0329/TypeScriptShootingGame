class GameManager {
    private _enemyList: Enemy[];
    private _randomNum: number;

    constructor() {
        this._enemyList = new Array<Enemy>();
        for (var i = 0; i < PoolingEnemyCount; i++) {
            this._enemyList.push(new Enemy());
        }
    }
    private EnemyMake(): void {
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
    }
    private EnemyUpdate(): void {
        for (var i = 0; i < this._enemyList.length; i++) {
            if (!this._enemyList[i].IsDead()) {
                this._enemyList[i].MoveEnemy();
            }
        }
    }
    private EnemyDraw(): void {
        for (var i = 0; i < this._enemyList.length; i++) {
            if (!this._enemyList[i].IsDead()) {
                this._enemyList[i].Draw();
            }
        }
    }


    public MainUpdate(): void {
        this.EnemyMake();
        this.EnemyUpdate();
    }
    public MainDraw(): void {
        this.EnemyDraw();
    }
}

