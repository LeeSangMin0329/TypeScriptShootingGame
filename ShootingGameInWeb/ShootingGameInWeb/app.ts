class Common {
    static readonly Fps: number = 60;
    static readonly PercentageCreateEnemy: number = 50; // 10 ~ 100  more less, more enemy

    static readonly ScreenHeight: number = 800;
    static readonly ScreenWidth: number = 500;

    static readonly PlayerMoveSpeed: number = 8;
    static readonly BulletSpeed: number = 8;
    static readonly BulletDamage: number = 40;

    static readonly PoolingEnemyCount: number = 5;
    static readonly PoolingBulletCount: number = 10;

    static KeyPressOn = {};

    static Score: number = 0;

    static readonly Canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('Canvas');
    static readonly Context: CanvasRenderingContext2D = Common.Canvas.getContext("2d");

    public static DrawContext(img: HTMLImageElement, xPos: number, yPos: number, w: number, h: number): void {
        Common.Context.drawImage(img, xPos, yPos, w, h);
    }

    public static DrawText(str: string, xPos: number, yPos: number) {
        Common.Context.fillText(str, xPos, yPos);
    }
}

Common.Context.fillStyle = "white";
Common.Context.font = '20pt Arial';



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

