
class Player {

    private _imgLangth: number = 4;

    private _img: HTMLImageElement[];

    private _imgIndex: number = 0;
    private _count: number;
    private _bCount: number;
    
    private _xPos: number;
    private _yPos: number;
    private _height: number;
    private _width: number;

    public IsDead: boolean = false;

    public XPos(): number { return this._xPos; }
    public YPos(): number { return this._yPos; }
    public Height(): number { return this._height; }
    public Width(): number { return this._width; }

    // bullet
    private _bulletList: Bullet[];
    public BulletList(): Bullet[] { return this._bulletList; }

    constructor() {
        this._img = new Array<HTMLImageElement>(this._imgLangth);
        for (var i = 0; i < this._img.length; i++) {
            this._img[i] = new Image();
            this._img[i].src = "images/player0" + i + ".png";
        }

        this._xPos = Common.ScreenWidth / 2;
        this._yPos = Common.ScreenHeight * 0.8;
        this._count = 0;
        this._bCount = 0;

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

        if (!this.IsDead) {

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
        if (!this.IsDead) {
            this.CalcKeyInput();

            // Make bullet
            this._bCount++;
            if (this._bCount >= Common.Fps / this._imgLangth) {
                this._bCount = 0;
                for (var i = 0; i < this._bulletList.length; i++) {
                    if (this._bulletList[i].IsDead) {
                        this._bulletList[i].Init(this._xPos + this._img[0].height / 2, this._yPos + this._img[0].width / 2);
                        break;
                    }
                }
            }
            
        }

        // Move bullet
        for (var i = 0; i < this._bulletList.length; i++) {
            this._bulletList[i].MoveBullet();
        }
    }
    
    private CalcKeyInput(): void {

        if (Common.KeyPressOn["38"] && this._yPos >= -this._height / 2)

            this._yPos -= Common.PlayerMoveSpeed;  //up

        if (Common.KeyPressOn["40"] && this._yPos <= Common.Canvas.height - this._height / 2)

            this._yPos += Common.PlayerMoveSpeed;  //down

        if (Common.KeyPressOn["37"] && this._xPos >= -this._width / 2)

            this._xPos -= Common.PlayerMoveSpeed;  //left

        if (Common.KeyPressOn["39"] && this._xPos <= Common.Canvas.width - this._width / 2)

            this._xPos += Common.PlayerMoveSpeed;  //right
    }
}

