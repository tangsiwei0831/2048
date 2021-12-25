// define js array
var board = new Array();

var hasConflicted = new Array();

var score = 0;

$(function() {
    newgame();
});

function newgame() {
    // initialize the grid
    init();
    generateOneNumber();
    generateOneNumber();
}

function restartgame(){
    $("#gameover").remove();
    updateScore(0);
    newgame();
}

function init() {
    for(var i=0; i<4;i++){
        for(var j=0;j<4;j++){
            var gridCell = $("#grid-cell-" +i+"-"+j);
            // define distance of cell to top
            gridCell.css("top", getPosTop(i));
            //  define distance of cell to left
            gridCell.css("left", getPosLeft(j));

        }
    }

    for(var i=0; i<4;i++){
        board[i]= new Array();
        hasConflicted[i] = new Array();
        for(var j=0;j<4;j++){
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }

    updateBoardView();
    score = 0;
    $("#score").text(0);
}

function updateBoardView(){
    $(".number-cell").remove();
    for(var i=0; i<4;i++){
        for(var j=0;j<4;j++){
            $("#grid-container").append("<div class='number-cell' id='number-cell-"+i+"-"+j+"'></div>");
            var numberCell = $("#number-cell-" +i+"-"+j);
            // if value in cell is 0, set number cell be 0 in width and height
            if (board[i][j] == 0){
                numberCell.css("width", "0px");
                numberCell.css("height", "0px");
                numberCell.css("top", getPosTop(i) + 50);
                numberCell.css("left", getPosLeft(j) + 50);
            }
            else {
                numberCell.css("width", "100px");
                numberCell.css("height", "100px");
                numberCell.css("top", getPosTop(i));
                numberCell.css("left", getPosLeft(j));
                numberCell.css("background-color", getNumberBackgroundColor(board[i][j]));
                numberCell.css("color", getNumberColor(board[i][j]));
                numberCell.text(board[i][j]);
            }
            hasConflicted[i][j] = false;
        }
    }
    $(".number-cell").css("line-height", "100px");
    $(".number-cell").css("font-size", "60px");
}


function generateOneNumber(){
    // generate random number in random position
    // generate random position
    var randx = parseInt(Math.floor(Math.random()*4));
    var randy = parseInt(Math.floor(Math.random()*4));
    while (true){
        if(board[randx][randy] == 0){
            break;
        }
        var randx = parseInt(Math.floor(Math.random()*4));
        var randy = parseInt(Math.floor(Math.random()*4)); 
    }
    // generate random number (2 or 4)
    // less than 0.5 is 2, more than 0.5 is 4
    var randNumber = Math.random() < 0.5 ? 2 : 4;
    // show number in position
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx, randy, randNumber);
}
