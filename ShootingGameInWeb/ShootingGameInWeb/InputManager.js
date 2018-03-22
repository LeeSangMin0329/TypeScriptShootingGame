var keyPressOn = {};
function OnKeyDown(event) {
    var keyValue;
    var skipEvent = false;
    keyValue = event.keyCode;
    if (keyValue == "87") {
        keyValue = "38";
        skipEvent = true;
    } //up
    else if (keyValue == "83") {
        keyValue = "40";
        skipEvent = true;
    } //down
    else if (keyValue == "65") {
        keyValue = "37";
        skipEvent = true;
    } //left
    else if (keyValue == "68") {
        keyValue = "39";
        skipEvent = true;
    } //right
    if (skipEvent) {
        window.event.preventDefault(); // defense event interference
    }
    keyPressOn[keyValue] = true;
}
function OnKeyUp(event) {
    var keyValue;
    keyValue = event.keyCode;
    window.event.preventDefault();
    if (keyValue == "87")
        keyValue = "38"; //up
    else if (keyValue == "83")
        keyValue = "40"; //down
    else if (keyValue == "65")
        keyValue = "37"; //left
    else if (keyValue == "68")
        keyValue = "39"; //right
    keyPressOn[keyValue] = false;
}
function calcKeyInnput() {
    if (keyPressOn["38"] && gameManager._player._yPos >= -gameManager._player._height / 2)
        gameManager._player._yPos -= Common.PlayerMoveSpeed; //up
    if (keyPressOn["40"] && gameManager._player._yPos <= Common.Canvas.height - gameManager._player._height / 2)
        gameManager._player._yPos += Common.PlayerMoveSpeed; //down
    if (keyPressOn["37"] && gameManager._player._xPos >= -gameManager._player._width / 2)
        gameManager._player._xPos -= Common.PlayerMoveSpeed; //left
    if (keyPressOn["39"] && gameManager._player._xPos <= Common.Canvas.width - gameManager._player._width / 2)
        gameManager._player._xPos += Common.PlayerMoveSpeed; //right
}
//# sourceMappingURL=InputManager.js.map