var gameManager = new GameManager();
var backGround = new BackGround();
var player = new Player(); // debug
function GameLoop() {
    gameManager.MainUpdate();
    backGround.BackScroll();
    gameManager.MainDraw();
    player.Draw();
}
window.onload = function () {
    setInterval(GameLoop, 1000 / Fps);
};
//# sourceMappingURL=Instantiate.js.map