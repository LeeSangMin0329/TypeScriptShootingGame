
class Bullet {

    private _img: HTMLImageElement;
    
    private _moveSpeed: number = Common.BulletSpeed;
    private _xPos: number;
    private _yPos: number;
    private _height: number;
    private _width: number;

    public IsDead: boolean = true;

    public XPos(): number { return this._xPos; }
    public YPos(): number { return this._yPos; }
    public Height(): number { return this._height; }
    public Width(): number { return this._width; }
    
    constructor() {
        this._img = new Image();
        this._img.src = "images/bullet.png";

        this._height = 20;
        this._width = 20;
    }

    public Init(xPos: number, yPos: number) {
        this._xPos = xPos;
        this._yPos = yPos;
        this.IsDead = false;
    }

    public MoveBullet() {
        if (!this.IsDead) {
            this._yPos -= this._moveSpeed;
            if (this._yPos <= -40) {
                this.IsDead = true;
            }
        }
    }

    public Draw() {
        if (!this.IsDead) {
            Common.DrawContext(this._img, this._xPos, this._yPos, this._width, this._height);
        }
    }
}