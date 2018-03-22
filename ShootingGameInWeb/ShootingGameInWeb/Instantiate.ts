var gameManager: GameManager = new GameManager();
var backGround: BackGround = new BackGround();

function GameLoop() {
    calcKeyInnput();

    gameManager.MainUpdate();

    
    backGround.BackScroll();

    gameManager.MainDraw();
}
window.addEventListener('load', function () {
    window.addEventListener('keydown', OnKeyDown);
    window.addEventListener('keyup', OnKeyUp);
    setInterval(GameLoop, 1000 / Common.Fps);
});
