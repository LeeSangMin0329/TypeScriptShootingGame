
class Player {

    private _imgLangth: number = 4;

    private _img: HTMLImageElement[];

    private _imgIndex: number = 0;
    private _count: number;

    private _isDead: boolean = false;
    
    public _xPos: number;  // deb
    public _yPos: number;

    public _height: number;     // deb
    public _width: number;

    // bullet
    private _bulletList: Bullet[];

    constructor() {
        this._img = new Array<HTMLImageElement>(this._imgLangth);
        for (var i = 0; i < this._img.length; i++) {
            this._img[i] = new Image();
            this._img[i].src = "images/player0" + i + ".png";
        }
        
        this._xPos = Common.ScreenWidth / 2;
        this._yPos = Common.ScreenHeight * 0.8;
        this._count = 0;

        this._height = 100;
        this._width = 100;

        // bullet
        this._bulletList = new Array<Bullet>();
        for (var i = 0; i < Common.PoolingBulletCount; i++) {
            this._bulletList.push(new Bullet());
        }
    }

    public Draw(): void {

        // bullet 
        for (var i = 0; i < this._bulletList.length; i++) {
            this._bulletList[i].Draw();
        }

        if (!this._isDead) {

            // every fps/4 loop change img sprite
            this._count++;
            if (this._count >= Common.Fps / this._imgLangth) {
                this._count = 0;
                this._imgIndex++;

                if (this._imgIndex >= this._imgLangth) {
                    this._imgIndex = 0;
                }
            }
            
            Common.DrawContext(this._img[this._imgIndex], this._xPos, this._yPos, this._width, this._height);
        }
    }

    public Update(): void {

        // bullet
        if (this._count >= Common.Fps / this._imgLangth -2) {
            for (var i = 0; i < this._bulletList.length; i++) {
                if (this._bulletList[i].IsDead()) {
                    this._bulletList[i].Init(this._xPos + this._img[0].height / 2, this._yPos + this._img[0].width / 2);
                    break;
                }
            }
        }
        for (var i = 0; i < this._bulletList.length; i++) {
            this._bulletList[i].MoveBullet();
        }
    }

    public Move(xDist: number, yDist: number) {
        this._xPos += xDist;
        this._yPos += yDist;
    }
}

