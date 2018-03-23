class Common {
    static readonly Fps: number = 60;
    static readonly PercentageCreateEnemy: number = 30; // 10 ~ 100  more less, more enemy

    static readonly ScreenHeight: number = 800;
    static readonly ScreenWidth: number = 500;

    static readonly PlayerMoveSpeed: number = 8;
    static readonly BulletSpeed: number = 8;
    static readonly BulletDamage: number = 40;

    static readonly PoolingEnemyCount: number = 5;
    static readonly PoolingBulletCount: number = 10;

    static KeyPressOn = {};

    static Score: number = 0;
    static Volume: number = 0.4;

    // off canvas
    static Canvas: HTMLCanvasElement;
    static Context: CanvasRenderingContext2D;

    // double buffering
    static ViewCanvas: HTMLCanvasElement;
    static ViewContext: CanvasRenderingContext2D;

    public static DrawContext(img: HTMLImageElement, xPos: number, yPos: number, w: number, h: number): void {
        Common.Context.drawImage(img, xPos, yPos, w, h);
    }

    public static DrawText(str: string, xPos: number, yPos: number) {
        Common.Context.fillStyle = "white";
        Common.Context.textAlign = 'left';
        Common.Context.font = '20pt Arial';

        Common.Context.fillText(str, xPos, yPos);
    }

    public static DrawMenu() {
        Common.Context.fillStyle = "white";
        Common.Context.textAlign = 'center';
        Common.Context.font = '30pt Arial';
        Common.Context.fillText("Press Enter Key to Start.", Common.ScreenWidth / 2, Common.ScreenHeight / 2);
    }
}

class BackGround {

    private _backImgYPos1: number = 0;
    private _backImgYPos2: number = -Common.ScreenHeight;
    private _scrollSpeed: number = 10;

    private readonly _backImg: HTMLImageElement = new Image();

    private _bgSound: HTMLAudioElement = new Audio("sounds/bg.mp3");

    constructor() {
        this._backImg.src = "images/spaceBg.jpg";
        this._bgSound.volume = Common.Volume;
        this._bgSound.loop = true;
        this._bgSound.play();
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

