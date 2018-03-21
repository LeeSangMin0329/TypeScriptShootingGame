var eneey = new Enemy();
function DrawLoop() {
    requestAnimationFrame(DrawLoop);
    backGround.BackScroll();
    enemy.MoveEnemy();
    enemy.Draw();
}
window.onload = function () {
    DrawLoop();
};
//# sourceMappingURL=test1.js.map