// enemy img src
var EnemyHP: number = 120;

class Enemy {
    private _imgLangth: number = 8;
    private _enemyImg: HTMLImageElement[];
    private _imgIndex: number = 0;
    private _count: number;
    
    private _moveSpeed: number = 10;
    private _xPos: number;
    private _yPos: number;
    private _height: number;
    private _width: number;
    private _isDead: boolean = true;

    private _hp: number;

    public IsEnable(): boolean {
        return (this._isDead && this._eff.IsEnd());
    }
    public IsDead(): boolean {
        return this._isDead;
    }
    public DoDead(): void {
        this._isDead = true;
    }

    public XPos(): number { return this._xPos; }
    public YPos(): number { return this._yPos; }
    public Height(): number { return this._height; }
    public Width(): number { return this._width; }

    // Eff & Sound
    private _eff: Explosion1 = new Explosion1();
    
    // if enemy dead, return true
    public Damage(amount: number): boolean {
        this._hp -= amount;
        if (this._hp <= 0) {
            this._isDead = true;
            this._eff.On();
            return true;
        }
        return false;
    }

    constructor() {
        this._enemyImg = new Array<HTMLImageElement>(this._imgLangth);
        for (var i = 0; i < this._enemyImg.length; i++) {
            this._enemyImg[i] = new Image();
            this._enemyImg[i].src = "images/무냐" + i + ".png";
        }
        
        this._height = 100;
        this._width = 100;

        this._isDead = true;
        var randomNum: number = Math.floor(Math.random() * 9);
        this._xPos = Common.ScreenWidth * 0.1 * randomNum;
        this._yPos = -50;
        this._count = 0;

        this._hp = EnemyHP;
    }

    public Init(): void {
        this._isDead = false;
        var randomNum: number = Math.floor(Math.random() * 9);
        this._xPos = Common.ScreenWidth * 0.1 * randomNum;
        this._yPos = -50;
        this._count = 0;

        this._hp = EnemyHP;
    }

    public MoveEnemy(): void {
        if (!this.IsEnable()) {
            this._yPos += this._moveSpeed;
            if (this._yPos >= Common.ScreenHeight + 50) {
                this._isDead = true;
            }
        }
    }
    public Draw(): void {
        if (!this._isDead) {

            this._count++;
            if (this._count >= Common.Fps / this._imgLangth) {
                this._count = 0;
                this._imgIndex++;

                if (this._imgIndex >= this._imgLangth) {
                    this._imgIndex = 0;
                }
            }

            Common.DrawContext(this._enemyImg[this._imgIndex], this._xPos, this._yPos, this._width, this._height);
        }
        else if (!this._eff.IsEnd()) {
            this._eff.Draw(this._xPos, this._yPos);
        }
    }
}

