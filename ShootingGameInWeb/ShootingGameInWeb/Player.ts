
class Player {

    private _imgLangth: number = 4;

    private _img: HTMLImageElement[];
    private _imgIndex: number = 0;
    private _count: number;

    private _isDead: boolean = false;

    private _moveSpeed: number = 3;
    private _xPos: number;
    private _yPos: number;

    constructor() {
        this._img = new Array<HTMLImageElement>(this._imgLangth);
        for (var i = 0; i < this._img.length; i++) {
            this._img[i] = new Image();
            this._img[i].src = "images/player0" + i + ".png";
        }
        
        this._xPos = ScreenWidth / 2;
        this._yPos = ScreenHeight * 0.8;
        this._count = 0;
    }

    public Draw(): void {
        if (!this._isDead) {

            // every fps/4 loop change img sprite
            this._count++;
            if (this._count >= Fps / this._imgLangth) {
                this._count = 0;
                this._imgIndex++;

                if (this._imgIndex >= this._imgLangth) {
                    this._imgIndex = 0;
                }
            }
            
            Context.drawImage(this._img[this._imgIndex], this._xPos, this._yPos, 100, 100);
        }
    }
}

