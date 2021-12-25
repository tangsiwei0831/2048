// keydown represents keyboard is pressed
$(document).keydown(function(event){
    switch(event.keyCode){
        // left, up, right, down
        case 37:
            if(moveLeft()){
                setTimeout("generateOneNumber()", 210);
                // check if game ends
                setTimeout("isgameover()", 300);
            }
            break;
        case 38:
            if(moveUp()){
                setTimeout("generateOneNumber()", 210)
                // check if game ends
                setTimeout("isgameover()", 300);
            }
            break;
        case 39:
            if(moveRight()){
                setTimeout("generateOneNumber()", 210)
                // check if game ends
                setTimeout("isgameover()", 300);
            }
            break;
        case 40:
            if(moveDown()){
                setTimeout("generateOneNumber()", 210)
                // check if game ends
                setTimeout("isgameover()", 300);
            }
            break;
        default:
            break;
    }
});

function moveLeft(){
    if(!canMoveLeft(board)){
        return false;
    }
    // move left
    for(var i=0; i<4;i++){
        // if j is 0, cannot move left
        for(var j=1;j<4;j++){
            if(board[i][j] != 0){
                for(var k=0;k<j;k++){
                    if(board[i][k] == 0 && noBlockHorizontalCol(i,k,j,board)){
                        // can move left
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;

                        continue;
                    }else if(board[i][k] == board[i][j] && noBlockHorizontalCol(i,k,j,board) && !hasConflicted[i][k]){
                        // can move left
                        showMoveAnimation(i,j,i,k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        score += board[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;

                        continue;
                        
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}

function moveRight(){
    if(!canMoveRight(board)){
        return false;
    }
    for(var i=0; i<4;i++){
        for(var j=2;j>=0;j--){
            if(board[i][j] != 0){
                for(var k=3;k>j;k--){
                    if(board[i][k] == 0 && noBlockHorizontalCol(i,j,k,board)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;

                        continue;
                    }else if(board[i][k] == board[i][j] && noBlockHorizontalCol(i,j,k,board) && !hasConflicted[i][k]){
                        showMoveAnimation(i,j,i,k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        score += board[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;

                        continue;
                        
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}


function moveUp(){
    if(!canMoveUp(board)){
        return false;
    }
    for(var i=1; i<4;i++){
        for(var j=0;j<4;j++){
            if(board[i][j] != 0){
                for(var k=0;k<i;k++){
                    if(board[k][j] == 0 && noBlockHorizontalRow(k,i,j,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;

                        continue;
                    }else if(board[k][j] == board[i][j] && noBlockHorizontalRow(k,i,j,board) && !hasConflicted[k][j]){
                        showMoveAnimation(i,j,k,j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        score += board[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;

                        continue;
                        
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}

function moveDown(){
    if(!canMoveDown(board)){
        return false;
    }
    for(var i=2; i>=0; i--){
        for(var j=0; j<4; j++){
            if(board[i][j] != 0){
                for(var k=3; k>i; k--){
                    if(board[k][j] == 0 && noBlockHorizontalRow(i,k,j,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;

                        continue;
                    }else if(board[k][j] == board[i][j] && noBlockHorizontalRow(i,k,j,board) && !hasConflicted[k][j]){
                        showMoveAnimation(i,j,k,j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        score += board[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;

                        continue;
                        
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView();", 200);
    return true;
}

function isgameover(){
    if(nospace(board) && nomove(board)){
        gameover();
    }
}

function gameover(){
    $("#grid-container").append("<div id='gameover' class='gameover'><p>Game Score</p><span>" + score + "</span><a href='javascript:restartgame();' id='restartgamebutton'>Restart</a></div>");
    var gameover = $("#gameover");
    gameover.css("width", "500px");
    gameover.css("height", "500px");
    gameover.css("background-color", "rgba(0, 0, 0, 0.5)");
}