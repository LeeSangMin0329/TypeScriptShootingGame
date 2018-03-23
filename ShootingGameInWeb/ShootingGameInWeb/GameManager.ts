class GameManager {
    private _enemyList: Enemy[];
    private _randomNum: number;

    private _player: Player;

    private _collsion: Collision;

    private _MenuPopUp: boolean = false;

    constructor() {
        this._enemyList = new Array<Enemy>();
        for (var i = 0; i < Common.PoolingEnemyCount; i++) {
            this._enemyList.push(new Enemy());
        }

        this._player = new Player();

        this._collsion = new Collision();
    }

    private EnemyMake(): void {
        this._randomNum = Math.floor(Math.random() * Common.PercentageCreateEnemy);
        if (this._randomNum != 10) {
            return;
        }
        for (var i = 0; i < this._enemyList.length; i++) {
            if (this._enemyList[i].IsEnable()) {
                this._enemyList[i].Init();
                break;
            }
        }
    }
    private EnemyUpdate(): void {
        for (var i = 0; i < this._enemyList.length; i++) {
            if (!this._enemyList[i].IsEnable()) {
                this._enemyList[i].MoveEnemy();
            }
        }
    }
    private EnemyDraw(): void {
        for (var i = 0; i < this._enemyList.length; i++) {
            if (!this._enemyList[i].IsEnable()) {
                this._enemyList[i].Draw();
            }
        }
    }

    private IsPressEnterKey(): boolean {
        return Common.KeyPressOn["13"]; // enter
    }
    
    public MainUpdate(): void {
        
        this._player.Update();

        if (!this._MenuPopUp) {
            this.EnemyMake();
        }
        
        this.EnemyUpdate();

        // Collision
        if (!this._collsion.CheckPlayerToEnemys(this._player, this._enemyList)) {
            // Game Over
            this._MenuPopUp = true;
            for (var i = 0; i < this._enemyList.length; i++) {
                this._enemyList[i].DoDead();
            }
        }
        this._collsion.CheckBulletToEnemys(this._player.BulletList(), this._enemyList);

        if (this._MenuPopUp) {
            if (this.IsPressEnterKey()) {
                this._MenuPopUp = false;
                this._player.Init();
                Common.Score = 0;
            }
        }
    }
    public MainDraw(): void {
        this.EnemyDraw();
        this._player.Draw();

        if (this._MenuPopUp) {
            Common.DrawMenu();
        }
    }
}

