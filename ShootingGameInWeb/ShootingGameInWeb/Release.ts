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

    public IsDead: boolean;

    public XPos(): number { return this._xPos; }
    public YPos(): number { return this._yPos; }
    public Height(): number { return this._height; }
    public Width(): number { return this._width; }

    // bullet
    private _bulletList: Bullet[];
    public BulletList(): Bullet[] { return this._bulletList; }

    // Eff & Sound
    private _eff: Explosion1 = new Explosion1();
    private _shotSound: HTMLAudioElement = new Audio("sounds/shot.mp3");

    constructor() {
        this._img = new Array<HTMLImageElement>(this._imgLangth);
        for (var i = 0; i < this._img.length; i++) {
            this._img[i] = new Image();
            this._img[i].src = "images/player0" + i + ".png";
        }

        this.Init();

        // bullet
        this._bulletList = new Array<Bullet>();
        for (var i = 0; i < Common.PoolingBulletCount; i++) {
            this._bulletList.push(new Bullet());
        }

        this._shotSound.volume = Common.Volume;
    }

    public Init() {
        this._xPos = Common.ScreenWidth / 2;
        this._yPos = Common.ScreenHeight * 0.8;
        this._count = 0;
        this._bCount = 0;

        this._height = 100;
        this._width = 100;

        this.IsDead = false;
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
        else if (!this._eff.IsEnd()) {
            this._eff.Draw(this._xPos, this._yPos);
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

                        this._shotSound.currentTime = 0;
                        this._shotSound.play();
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

    public GameOver(): void {
        this.IsDead = true;
        this._eff.On();
    }
}


class Collision {

    // sound
    private _hit: HTMLAudioElement = new Audio("sounds/hit.mp3");

    constructor() {
        this._hit.volume = Common.Volume;
    }

    public CheckPlayerToEnemys(player: Player, enemys: Enemy[]): boolean {
        for (var i = 0; i < enemys.length; i++) {

            if (enemys[i].IsDead() || player.IsDead) {
                continue;
            }

            var check: boolean =
                player.XPos() > enemys[i].XPos() - enemys[i].Height() / 2 &&
                player.XPos() < enemys[i].XPos() + enemys[i].Height() / 2 &&
                player.YPos() > enemys[i].YPos() - enemys[i].Width() / 2 &&
                player.YPos() < enemys[i].YPos() + enemys[i].Width() / 2;

            if (check) {// collision
                player.GameOver();
                return false;  // signal to gameManager GameOver
            }
        }
        return true;
    }

    public CheckBulletToEnemys(bullets: Bullet[], enemys: Enemy[]): void {
        for (var j = 0; j < bullets.length; j++) {
            for (var i = 0; i < enemys.length; i++) {

                if (bullets[j].IsDead || enemys[i].IsDead()) {
                    continue;
                }

                var check: boolean =
                    bullets[j].XPos() + bullets[j].Width() / 2 > enemys[i].XPos() &&
                    bullets[j].XPos() + bullets[j].Width() / 2 < enemys[i].XPos() + enemys[i].Width() &&
                    bullets[j].YPos() + bullets[j].Height() / 2 > enemys[i].YPos() &&
                    bullets[j].YPos() + bullets[j].Height() / 2 < enemys[i].YPos() + enemys[i].Height();

                if (check) {
                    this._hit.currentTime = 0;
                    this._hit.play();

                    bullets[j].IsDead = true;
                    if (enemys[i].Damage(Common.BulletDamage)) {    // if enemy dead
                        Common.Score += 10;
                    }
                }
            }
        }
    }
}

class GameManager {
    private _enemyList: Enemy[];
    private _randomNum: number;

    private _player: Player;

    private _collsion: Collision;

    private _MenuPopUp: boolean = false;

    constructor() {
        this._enemyList = new Array<Enemy>();
        for (var i = 0; i < Common.PoolingEnemyCount; i++) {
            this._enemyList.push(new Enemy());
        }

        this._player = new Player();

        this._collsion = new Collision();
    }

    private EnemyMake(): void {
        this._randomNum = Math.floor(Math.random() * Common.PercentageCreateEnemy);
        if (this._randomNum != 10) {
            return;
        }
        for (var i = 0; i < this._enemyList.length; i++) {
            if (this._enemyList[i].IsEnable()) {
                this._enemyList[i].Init();
                break;
            }
        }
    }
    private EnemyUpdate(): void {
        for (var i = 0; i < this._enemyList.length; i++) {
            if (!this._enemyList[i].IsEnable()) {
                this._enemyList[i].MoveEnemy();
            }
        }
    }
    private EnemyDraw(): void {
        for (var i = 0; i < this._enemyList.length; i++) {
            if (!this._enemyList[i].IsEnable()) {
                this._enemyList[i].Draw();
            }
        }
    }

    private IsPressEnterKey(): boolean {
        return Common.KeyPressOn["13"]; // enter
    }

    public MainUpdate(): void {

        this._player.Update();

        if (!this._MenuPopUp) {
            this.EnemyMake();
        }

        this.EnemyUpdate();

        // Collision
        if (!this._collsion.CheckPlayerToEnemys(this._player, this._enemyList)) {
            // Game Over
            this._MenuPopUp = true;
            for (var i = 0; i < this._enemyList.length; i++) {
                this._enemyList[i].DoDead();
            }
        }
        this._collsion.CheckBulletToEnemys(this._player.BulletList(), this._enemyList);

        if (this._MenuPopUp) {
            if (this.IsPressEnterKey()) {
                this._MenuPopUp = false;
                this._player.Init();
                Common.Score = 0;
            }
        }
    }
    public MainDraw(): void {
        this.EnemyDraw();
        this._player.Draw();

        if (this._MenuPopUp) {
            Common.DrawMenu();
        }
    }
}

var gameManager: GameManager = new GameManager();
var backGround: BackGround = new BackGround();

function GameLoop() {

    gameManager.MainUpdate();


    backGround.BackScroll();

    gameManager.MainDraw();

    Common.DrawText("SCORE : " + Common.Score, 10, 30);

    // double buffering
    Common.ViewContext.drawImage(Common.Canvas, 0, 0);
}
window.addEventListener('load', function () {
    Common.Canvas = document.createElement("canvas");
    Common.Canvas.width = Common.ScreenWidth;
    Common.Canvas.height = Common.ScreenHeight;
    Common.Context = Common.Canvas.getContext('2d');

    Common.ViewCanvas = <HTMLCanvasElement>document.getElementById("Canvas");
    Common.ViewContext = Common.ViewCanvas.getContext("2d");

    window.addEventListener('keydown', OnKeyDown);
    window.addEventListener('keyup', OnKeyUp);
    setInterval(GameLoop, 1000 / Common.Fps);
});


function OnKeyDown(event) {

    var keyValue;

    var skipEvent = false;

    keyValue = event.keyCode;

    if (keyValue == "87") { keyValue = "38"; skipEvent = true; }       //up

    else if (keyValue == "83") { keyValue = "40"; skipEvent = true; }  //down

    else if (keyValue == "65") { keyValue = "37"; skipEvent = true; }  //left

    else if (keyValue == "68") { keyValue = "39"; skipEvent = true; }  //right

    if (skipEvent) {
        window.event.preventDefault();  // defense event interference
    }

    Common.KeyPressOn[keyValue] = true;
}

function OnKeyUp(event) {

    var keyValue;

    keyValue = event.keyCode;

    window.event.preventDefault();

    if (keyValue == "87") keyValue = "38";       //up

    else if (keyValue == "83") keyValue = "40";  //down

    else if (keyValue == "65") keyValue = "37";  //left

    else if (keyValue == "68") keyValue = "39";  //right

    Common.KeyPressOn[keyValue] = false;
}

