function showNumberWithAnimation(i, j, randNumber){
    var numberCell = $("#number-cell-" +i+"-"+j);
    numberCell.css("background-color", getNumberBackgroundColor(randNumber));
    numberCell.css("color", getNumberColor(randNumber));
    numberCell.text(randNumber);

    numberCell.animate({
        width: "100px",
        height: "100px",
        top: getPosTop(i),
        left: getPosLeft(j),
    }, 50);
}

function showMoveAnimation(fromx, fromy,tox,toy){
    // get current cell number
    var numberCell = $("#number-cell-"+fromx+"-"+fromy);
    numberCell.animate({
        top: getPosTop(tox),
        left: getPosLeft(toy)
    }, 200);
}

function updateScore(score){
    $("#score").text(score);
}