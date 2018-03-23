
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

