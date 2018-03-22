class GameManager {
    private _enemyList: Enemy[];
    private _randomNum: number;

    public _player: Player; // deb

    constructor() {
        this._enemyList = new Array<Enemy>();
        for (var i = 0; i < Common.PoolingEnemyCount; i++) {
            this._enemyList.push(new Enemy());
        }

        this._player = new Player();
    }
    private EnemyMake(): void {
        this._randomNum = Math.floor(Math.random() * Common.PercentageCreateEnemy);
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
        this._player.Update();
        this.EnemyMake();
        this.EnemyUpdate();
    }
    public MainDraw(): void {
        this.EnemyDraw();
        this._player.Draw();
    }

    public PlayerMove(xDist: number, yDist: number) {
        this._player.Move(xDist, yDist);
    }
}

