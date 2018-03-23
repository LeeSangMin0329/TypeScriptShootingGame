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
