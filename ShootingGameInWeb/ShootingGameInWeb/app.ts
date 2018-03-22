class Common {
    static readonly Fps: number = 60;
    static readonly PercentageCreateEnemy: number = 50; // 10 ~ 100  more less, more enemy

    static readonly ScreenHeight: number = 800;
    static readonly ScreenWidth: number = 500;

    static readonly PlayerMoveSpeed: number = 8;
    static readonly BulletSpeed: number = 8;

    static readonly PoolingEnemyCount: number = 5;
    static readonly PoolingBulletCount: number = 10;

    static readonly Canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('Canvas');
    static readonly Context: CanvasRenderingContext2D = Common.Canvas.getContext("2d");

    public static DrawContext(img: HTMLImageElement, xPos: number, yPos: number, w: number, h: number): void {
        Common.Context.drawImage(img, xPos, yPos, w, h);
    }
}




class BackGround {

    private _backImgYPos1: number = 0;
    private _backImgYPos2: number = -Common.ScreenHeight;
    private _scrollSpeed: number = 10;

    private readonly _backImg: HTMLImageElement = new Image();

    constructor() {
        this._backImg.src = "images/backBg.jpg";
    }

    public BackScroll(): void {

        Common.DrawContext(this._backImg, 0, this._backImgYPos1, Common.ScreenWidth, Common.ScreenHeight);
        Common.DrawContext(this._backImg, 0, this._backImgYPos2, Common.ScreenWidth, Common.ScreenHeight);

        this._backImgYPos1 += this._scrollSpeed;
        this._backImgYPos2 += this._scrollSpeed;

        if (this._backImgYPos1 >= Common.ScreenHeight) {
            this._backImgYPos1 = -Common.ScreenHeight;
            this._backImgYPos2 = 0;
        }

        if (this._backImgYPos2 >= Common.ScreenHeight) {
            this._backImgYPos2 = -Common.ScreenHeight;
            this._backImgYPos1 = 0;
        }
    }
}

// enemy img src
var EnemyImgSrc: string = 'images/무냐.png';

class Enemy {

    private _enemyImg: HTMLImageElement = new Image();
    private _isDead: boolean = true;

    private _moveSpeed: number = 10;
    private _xPos: number;
    private _yPos: number;

    constructor() {
        this._enemyImg.src = EnemyImgSrc; // do you random if other img src exist;
        var randomNum: number = Math.floor(Math.random() * 5);
        this._xPos = Common.ScreenWidth * 0.1 * randomNum;
        this._yPos = -50;
    }

    public Init(): void {
        this._isDead = false;
        var randomNum: number = Math.floor(Math.random() * 9);
        this._xPos = Common.ScreenWidth * 0.1 * randomNum;
        this._yPos = -50;
    }

    public IsDead(): boolean {
        return this._isDead;
    }

    public MoveEnemy(): void {
        if (!this._isDead) {
            this._yPos += this._moveSpeed;
            if (this._yPos >= Common.ScreenHeight + 50) {
                this._isDead = true;
            }
        }
    }
    public Draw(): void {
        if (!this._isDead) {
            Common.DrawContext(this._enemyImg, this._xPos, this._yPos, 100, 100);
        }
    }
}

