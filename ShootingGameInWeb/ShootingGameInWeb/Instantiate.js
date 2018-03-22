var gameManager = new GameManager();
var backGround = new BackGround();
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
//# sourceMappingURL=Instantiate.js.map