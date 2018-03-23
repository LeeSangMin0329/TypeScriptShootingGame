// enemy img src
var EnemyImgSrc: string = 'images/무냐.png';
var EnemyHP: number = 100;

class Enemy {

    private _enemyImg: HTMLImageElement = new Image();
    
    private _moveSpeed: number = 10;
    private _xPos: number;
    private _yPos: number;
    private _height: number;
    private _width: number;

    private _hp: number;

    public IsDead: boolean = true;

    public XPos(): number { return this._xPos; }
    public YPos(): number { return this._yPos; }
    public Height(): number { return this._height; }
    public Width(): number { return this._width; }

    // if enemy dead, return true
    public Damage(amount: number): boolean {
        this._hp -= amount;
        if (this._hp <= 0) {
            this.IsDead = true;
            return true;
        }
        return false;
    }

    constructor() {
        this._enemyImg.src = EnemyImgSrc; // do you random if other img src exist;
        var randomNum: number = Math.floor(Math.random() * 5);
        this._xPos = Common.ScreenWidth * 0.1 * randomNum;
        this._yPos = -50;

        this._height = 100;
        this._width = 100;
        this._hp = EnemyHP;
    }

    public Init(): void {
        this.IsDead = false;
        var randomNum: number = Math.floor(Math.random() * 9);
        this._xPos = Common.ScreenWidth * 0.1 * randomNum;
        this._yPos = -50;

        this._hp = EnemyHP;
    }

    public MoveEnemy(): void {
        if (!this.IsDead) {
            this._yPos += this._moveSpeed;
            if (this._yPos >= Common.ScreenHeight + 50) {
                this.IsDead = true;
            }
        }
    }
    public Draw(): void {
        if (!this.IsDead) {
            Common.DrawContext(this._enemyImg, this._xPos, this._yPos, this._width, this._height);
        }
    }
}

