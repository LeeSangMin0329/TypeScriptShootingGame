var gameManager = new GameManager();
var backGround = new BackGround();
function GameLoop() {
    gameManager.MainUpdate();
    backGround.BackScroll();
    gameManager.MainDraw();
    Common.DrawText("SCORE : " + Common.Score, 10, 30);
}
window.addEventListener('load', function () {
    window.addEventListener('keydown', OnKeyDown);
    window.addEventListener('keyup', OnKeyUp);
    setInterval(GameLoop, 1000 / Common.Fps);
});
//# sourceMappingURL=Instantiate.js.map