var wincond = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
var GAME_ROUNDS=9;
var rounds = 9, xAndOTable, isbot;
var Score = {
    X: 0,
    O: 0
}
var scoretable = document.querySelectorAll("#scoretable tr");
var winnerlabel = document.querySelector("#winnerLabel");
var main = document.querySelector("#main-game");
var gameoption = document.querySelector('.modal');
var playagainbutton = document.querySelector('#loadgame');
playagainbutton.addEventListener('click', loadGame);
document.querySelector('#GameOptions').addEventListener('click', openGameOptions);
document.querySelector('.btn').addEventListener('click', closeGameOptions);
document.querySelector('#restartgame').addEventListener('click', startNewGame);
function loadGame() {
    playagainbutton.style.display = "none";
    main.innerHTML = ` <tr row="0">  <td col="0"></td><td col="1" class="vert"></td><td col="2"></td></tr><tr row="1"><td col="0" class="hori"></td><td col="1" class="vert hori"></td><td col="2" class="hori"></td></tr><tr row="2"><td col="0"></td> <td col="1" class="vert"></td><td col="2"></td></tr>`;
    xAndOTable = document.querySelectorAll("#main-game td");
    rounds = GAME_ROUNDS;
    main.addEventListener('click', (e) => {
        target = e.target;
        if (rounds > 0 && !!target.getAttribute("col") && target.textContent == "" && !!target.parentElement.getAttribute("row")) {
            AddToTableXorO(target, rounds % 2);
        }

    })
}
function AddToTableXorO(pos, turn) {
    let sign = CheckTurn(turn);
    if (!isbot) {
        playersAddingXorO(pos, sign);
    }
    else {
        playersAddingXorO(pos, sign);
        if (isbot && rounds > 1) {
            AiTurn();
            CheckWinner();

        }

    }

}
function CheckTurn(turn) {
    switch (turn) {
        case 1:
            return "X";

        case 0:
            return "O";
    }
}
function CheckWinner() {
    countX = 0;
    countO = 0;
    var Winner = null;
    for (var i = 0; i < wincond.length; i++) {
        countX = countO = 0;
        for (var j = 0; j < wincond[i].length; j++) {
            if ((xAndOTable[wincond[i][j]]).textContent == "X")
                countX++;
            if ((xAndOTable[wincond[i][j]]).textContent == "O")
                countO++;
        }
        if ((Winner=CheckCount(countX,countO))) {
            break;
        }
        
    }
    if (Winner == null && rounds == 0) {
        playagainbutton.style.display = "block";
        sayTheWinner("Draw");
    }

}
function AiTurn() {
    let Choosed = false;
    Choosed=botCheckForCounterorWinCondition("O");

    if(!Choosed){
        Choosed=botCheckForCounterorWinCondition("X")
    }
    if(!Choosed){
    RandomPos();
    }
    rounds--;
}
function RandomPos() {
    let isFound = false;
    let i;
    while (!isFound) {
        i = Math.floor(Math.random() * GAME_ROUNDS);
        if (xAndOTable[i].textContent == "") {
            xAndOTable[i].textContent = "O";
            isFound = true;
        }
    }
}
function openGameOptions() {
    gameoption.style.display = "block";
}
function closeGameOptions() {
    gameoption.style.display = "none";
}
function startNewGame() {
    closeGameOptions();
    RestartScore();
    isbot = ((document.querySelector("#selectbox").value) == 1);
    loadGame();
}
function RestartScore() {
    Score.X = 0;
    Score.O = 0;
    scoretable[1].children[1].textContent = Score.X;
    scoretable[2].children[1].textContent = Score.O;
}

function playersAddingXorO(pos, sign) {
    --rounds;
    pos.textContent = sign;
    CheckWinner();
}
function sayTheWinner(player) {
    UpdateScore();
    winnerlabel.style.display = "block";
    if (player == "Draw")
        winnerlabel.firstChild.textContent = `Draw`;
    else
        winnerlabel.firstChild.textContent = `The Winner is player ${player}`;
    setTimeout(() => {
        winnerlabel.style.display = "none";
    }, 2000);
}
function UpdateScore() {
    scoretable[1].children[1].textContent = Score.X;
    scoretable[2].children[1].textContent = Score.O;
    checkWinnerOfTheGame();

}
function checkWinnerOfTheGame() {
    if (Score.X == 3) {
        winnerlabel.firstChild.textContent = `The Winner of the game is  player ${scoretable[1].children[0].textContent}`;
        startNewGame();

    }
    else if (Score.O == 3) {
        winnerlabel.firstChild.textContent = `The Winner of the game is  player ${scoretable[2].children[0].textContent}`;
        startNewGame();
    }

}
function CheckCount(x,o) {
    if (x == 3) {
        Score.X++;
        playagainbutton.style.display = "block";
        rounds = 0;
        sayTheWinner("X");
        return true;
}
else if (o==3){
    Score.O++;
    playagainbutton.style.display = "block";
    rounds = 0;
    sayTheWinner("O");
    return true;
}
else return null;
}
function botCheckForCounterorWinCondition(sign){
    for (var i = 0; i < wincond.length; i++) {
        if ((xAndOTable[wincond[i][0]]).textContent === sign && (xAndOTable[wincond[i][1]]).textContent === sign && (xAndOTable[wincond[i][2]]).textContent === "") {
            (xAndOTable[wincond[i][2]]).textContent = "O";
            return true;
        }

        else if ((xAndOTable[wincond[i][1]]).textContent === sign && (xAndOTable[wincond[i][2]]).textContent === sign && (xAndOTable[wincond[i][0]]).textContent === "") {
            (xAndOTable[wincond[i][0]]).textContent = "O";
            return true;
            
        }

        else if ((xAndOTable[wincond[i][0]]).textContent === sign && (xAndOTable[wincond[i][2]]).textContent === sign && (xAndOTable[wincond[i][1]]).textContent ==="") {
            (xAndOTable[wincond[i][1]]).textContent = "O";
            return true;
        }

}
}