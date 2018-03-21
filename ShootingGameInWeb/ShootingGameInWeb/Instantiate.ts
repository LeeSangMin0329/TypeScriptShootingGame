var gameManager: GameManager = new GameManager();
var backGround: BackGround = new BackGround();
var player: Player = new Player(); // debug


function GameLoop() {

    gameManager.MainUpdate();

    backGround.BackScroll();
    gameManager.MainDraw();
    player.Draw();
}
window.onload = () => {
    setInterval(GameLoop, 1000 / Fps);
}
