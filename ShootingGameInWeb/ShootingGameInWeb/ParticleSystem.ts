
class Explosion1 {

    private _img: HTMLImageElement[];
    private _aniLength: number;
    private _curIndex: number = 0;
    private _count: number = 0;

    private _height: number = 150;
    private _width: number = 150;

    private _isEnable: boolean;

    // sound
    private _sound: HTMLAudioElement = new Audio("sounds/exp01.ogg");

    constructor() {
        this._aniLength = 5;
        this._img = new Array<HTMLImageElement>(this._aniLength);
        for (var i = 0; i < this._img.length; i++) {
            this._img[i] = new Image();
            this._img[i].src = "images/exp00" + i + ".png";
        }

        this._isEnable = false;

        this._sound.volume = Common.Volume;
    }

    public On(): void {
        this._isEnable = true;
        this._sound.currentTime = 0;
        this._sound.play();
    }

    public IsEnd(): boolean {
        if (this._isEnable) {
            return false;
        }
        else {
            return true;
        }
    }

    public Draw(xPos: number, yPos: number): void {

        if (this._isEnable) {

            this._count++;

            // ani end on 1 frame
            if (this._count >= Common.Fps / this._aniLength) {
                this._count = 0;
                this._curIndex++;

                if (this._curIndex >= this._aniLength) {
                    this._curIndex = 0;
                    this._isEnable = false;
                }
            }

            Common.DrawContext(this._img[this._curIndex], xPos, yPos, this._width, this._height);
        }   
    }
}