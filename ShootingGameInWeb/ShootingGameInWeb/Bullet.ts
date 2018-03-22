
class Bullet {

    private _img: HTMLImageElement;
    private _isDead: boolean = true;

    private _moveSpeed: number = Common.BulletSpeed;
    private _xPos: number;
    private _yPos: number;

    private _height: number;
    private _width: number;

    constructor() {
        this._img = new Image();
        this._img.src = "images/bullet.png";

        this._height = 50;
        this._width = 50;
    }

    public Init(xPos: number, yPos: number) {
        this._xPos = xPos;
        this._yPos = yPos;
        this._isDead = false;
    }

    public IsDead() {
        return this._isDead;
    }

    public MoveBullet() {
        if (!this._isDead) {
            this._yPos -= this._moveSpeed;
            if (this._yPos <= -40) {
                this._isDead = true;
            }
        }
    }

    public Draw() {
        if (!this._isDead) {
            Common.DrawContext(this._img, this._xPos, this._yPos, this._width, this._height);
        }
    }
}