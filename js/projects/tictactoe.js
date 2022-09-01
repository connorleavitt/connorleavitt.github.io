const Player = (character) => {
    this.character = character
    const getCharacter = () => character
    return {
        getCharacter
    };
}

const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
          board[i] = "";
        }
      };

    return {
        board,
        reset
    }
  })();


const displayController = (() => {
    const X_CLASS = "x"
    const CIRCLE_CLASS = "circle"

    const board = document.getElementById('board')
    const boardCells = document.querySelectorAll("[data-cell]")
    const boardCellContent = document.querySelectorAll(".displayCell")
    const displayMsg = document.querySelector('.displayMsg')
    const resetBtn = document.getElementById('resetBtn')
    const winningMsgElement = document.querySelector('.winning-msg')
    
    let circleTurn = false;
    
    startGame()

    resetBtn.addEventListener('click', () => {
        gameBoard.reset()
        gameController.reset()
        updateDisplayMsg("Player 1's turn!")
        circleTurn = false;
        winningMsgElement.classList.remove('show')
        startGame()
    })

    function startGame() {
        setBoardHoverClass()
        boardCells.forEach((cell) => {
            cell.classList.remove(X_CLASS)
            cell.classList.remove(CIRCLE_CLASS)
            // cell.removeEventListener('click', handleClick)
            cell.addEventListener('click', handleClick)
        })
        
    }
        
    function handleClick(e) {
        const currentBoardClass = circleTurn ? CIRCLE_CLASS : X_CLASS
        let parentIndex = e.target.getAttribute('data-cell')
        
        if (gameController.getIsGameOver() || (e.target.classList.contains("x") || e.target.classList.contains("circle"))) return;
        placeMark(parentIndex);
        gameController.playRound(parentIndex);
        swapTurns()
        setBoardHoverClass()
    }

    const placeMark = (index) => {
        return [...boardCells][index].classList.add(gameController.currentPlayerCharacter())
    } 

    function swapTurns() {
        circleTurn = !circleTurn
    }

    function setBoardHoverClass() {
        board.classList.remove(X_CLASS)
        board.classList.remove(CIRCLE_CLASS)
        if (circleTurn) {
            board.classList.add(CIRCLE_CLASS)
        } else {
            board.classList.add(X_CLASS)
        }
    }

    const updateDisplayMsg = (msg) => {
        displayMsg.innerText = msg
    }

    return {
        startGame,
        placeMark,
        updateDisplayMsg,
        setBoardHoverClass
    }

    //MVP: 
        // 1) listen for cell clicks > update displayCell
        // 2) show reset button
    //Later: add AI or player 2, select first or second starting position (or X/O)
})();

const gameController = (() => {
    const playerX = Player("x") // calls Player function and assigns X
    const playerO = Player("circle") // calls Player function and assigns circle
    const board = document.getElementById('board')
    
    const winningMsgElement = document.querySelector('.winning-msg')
    const winningMsgTextElement = document.querySelector('[data-winning-msg-text]')

    let round = 1;
    let gameOver = false;
    let isDraw = false;

    const winScenarios = [
        [0, 1, 2], // row1
        [3, 4, 5], // row2
        [6, 7, 8], // row3
        [0, 3, 6], // col1
        [1, 4, 7], // col2
        [2, 5, 8], // col3
        [0, 4, 8], // diag1
        [2, 4, 6] // diag2
    ];
    
    const playRound = (index) => {
        const player = currentPlayerCharacter()
        gameBoard.board[index] = currentPlayerCharacter()
        if (checkWinner(currentPlayerCharacter())) {
            gameOver = true;
            // board.classList.remove(currentPlayerCharacter())
            // board.classList.remove(CIRCLE_CLASS)
            return endGame()
        }
        if (round === 9) { //checking for a draw
            isDraw = true;
            gameOver = true;
            return endGame()
        }
        round++
        displayController
            .updateDisplayMsg(
                `${player === 'circle' ? 
                    "It's Player 1's turn!" : 
                    "It's Player 2's turn!"}`
            )
    }
    
    const currentPlayerCharacter = () => {
        return round % 2 === 1 ? playerX.getCharacter() : playerO.getCharacter();
    }
    
    displayController.updateDisplayMsg(`It's Player 1's turn!`)
    
    const checkWinner = (currentPlayerCharacter) => {
        return winScenarios.some(combination => {
            return combination.every(index => {
                return gameBoard.board[index].includes(currentPlayerCharacter);
            })
        });
        /* IDEAS for checking winner:
            .filter for checking if array 1 matches array 2, 
                use like const intersection = array1.filter(element => array2.includes(element));

            but also need to check that its the same playerChar not just != ""...
            .sort out player charator then filter?

            .some() to check if any of the win conditions are true

            .every to make sure the player char is same when .some-ing?
        */
    }

    const getIsGameOver = () => {
        return gameOver;
      };

    function endGame() {
        const winner = currentPlayerCharacter()

        if(isDraw) {
            winningMsgTextElement.innerText = `It's a draw!`
        } else {
            winningMsgTextElement.innerText = `${winner === 'x' ? "Player 1 wins!" : "Player 2 wins!"}`
        }
        displayController.updateDisplayMsg(``)
        winningMsgElement.classList.add('show')
    }

    const reset = () => {
        round = 1;
        gameOver = false;
        isDraw = false;
    }

    return {
        getIsGameOver,
        playRound,
        currentPlayerCharacter,
        reset
    }
})();
    



/*
players 

    will be a factory func() since we need multiple
        object / person (2 total)
            name
            game piece (X or O)
            current player selections (if any)

    mvp will not have name and will auto choose game piece

game
    gameBoard - module
    displayController - module

    validation of player selection:
        is this cell open?
            if no, do nothing or display msg
            if yes,
                does this selection cause an endGameSequence?
                    if no, continue on to next player selection
                    if yes, display msg
    
    end of game sequence:
        when player X or O has 3 in a row (horizontally, vertically, or diagonally),
            trigger end game, display msg
            


DOM manipulations
    1) updating the DIVs for each player selection with associated X or O
    2) updating end of game sequence (win, lose, or draw)
    3) restart or clear button to reset board

*/

