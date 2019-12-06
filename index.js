(function(){
   
    const Player = (name, move) => {
        return {name, move}
    }

    const Operator = {
        /*params = [
            [firstX, firstY],
            [secondX, secondY],
            ...
        ]
        Need minimum 2 params.
        */
        isEqualMatrixVal(matrix, params) {
            let result = 1;
            for (let i = 0; i < params.length; i++) {
                if (!(params.length <= i+1)){
                    let x = params[i][0];
                    let y = params[i][1];
                    const first = matrix[x][y];

                    x = params[i + 1][0];
                    y = params[i + 1][1];
                    const second = matrix[x][y];
                    first && first === second ? result++ : null;
                }
            }
            return result === params.length;
        },
        hidePlayersForm() {
            const form = document.querySelector('.players__names');
            form.style.display = 'none';
        },
        hideStartGameBtn() {
            const btn = document.querySelector('.start-game-btn');
            btn.style.display = 'none';
        },
        showRestartGameBtn() {
            const btn = document.querySelector('.restart-game-btn');
            btn.style.display = 'inline';
        }
    }

    const Gameboard = () => {
        let board = [
            [],
            [],
            [],
        ];
        const boardCellFabric = () => {
            let board = document.createElement('div');
            board.classList = 'board__cell';
            board.addEventListener('click', (e) => Controller.doMove(e));
            return board;
        }
        const generateBoard = () => {
            for (let i = 0; i < 3; i++) {
                board[0].push(boardCellFabric());
                board[1].push(boardCellFabric());
                board[2].push(boardCellFabric());
            }
        }
        const renderBoard = () => {
            clearBoard();
            gameboard.generateBoard();
            let boardRoot = getBoardRoot();
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[i].length; j++) {
                    boardRoot.append(board[i][j]);
                }
                
            }
        }
        const getBoardRoot = () => {
            return document.querySelector('.board');
        }
        const getBoard = () => {
            return board;
        }
        const getBoardInnerHtml = () => {
            let result = [
                [],
                [],
                [],
            ];
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[i].length; j++) {
                    result[i][j] = board[i][j].innerHTML;
                }
                
            }
            return result;
        }
        const clearBoard = () => {
            getBoardRoot().innerHTML = "";
            board = [
                [],
                [],
                [],
            ];
        }
        return {
            getBoardInnerHtml,
            boardCellFabric,
            generateBoard,
            renderBoard,
            getBoardRoot,
            getBoard,
        }
    }

    const Message = (() => {
        const getMessageRoot = () => {
            return document.querySelector('.message');
        }
        const getMessage = () => {
            const name = Players.getCurrentPlayer().name;
            return `${name}, твоя очередь ходить.`;
        }
        const renderMessage = (name) => {
            const root = getMessageRoot();
            root.innerHTML = getMessage();
        }
        const clearMessage = () => {
            getMessageRoot().innerHTML = "";
        }
        return {
            renderMessage,
            clearMessage,
        }
    })();

    const Players = (() => {
        let playersNames = [];
        let players = [];
        const setPlayersNames = () => {
            const firstName = document.getElementById('first-player-name');
            const secondName = document.getElementById('second-player-name');
            playersNames = [firstName.value, secondName.value];
            firstName.value = "";
            secondName.value = "";
        }
        const createPlayers = () => {
            players = [Player(playersNames[0], "x"), Player(playersNames[1], "o")];
        }
        const getPlayers = () => {
            return players;
        }
        const getCurrentPlayer = () => {
            return Players.currentPlayer;
        }
        const setCurrentPlayer = () => {
            Players.currentPlayer = players[0]
        }
        const switchCurrentPlayer = () => {
            Players.currentPlayer = Players.currentPlayer == players[0] ? 
            Players.currentPlayer = players[1]: 
            Players.currentPlayer = players[0];
            Message.renderMessage();
            
        }
        return {
            switchCurrentPlayer,
            setCurrentPlayer,
            setPlayersNames,
            getCurrentPlayer,
            createPlayers,
            getPlayers,
        }
    })();

    const Controller = (() => {
        let players = [];
        const startGame = () => {
            players = Players.getPlayers();
            gameboard.renderBoard();
            Players.setPlayersNames();
            Players.createPlayers();
            Players.setCurrentPlayer();
            Operator.hidePlayersForm();
            Operator.hideStartGameBtn();
            Operator.showRestartGameBtn();
        }
        const restartGame = () => {
            players = Players.getPlayers();
            gameboard.renderBoard();
            Players.setCurrentPlayer();
        }
        const endGame = () => {
            const name = Players.getCurrentPlayer().name;
            gameboard.getBoardRoot().innerHTML = `${name} победил, игра окончена`;
            Message.clearMessage();
        }
        
        const doMove = async (e) => {
            let target = e.target;
            if(target.textContent === "") {
                target.textContent = Players.currentPlayer.move;
                if (checkGameResult()) {
                    endGame();
                } else {
                    Players.switchCurrentPlayer();
                };
            }
        }
        const checkGameResult = () => {
            const boardInnerHtml = gameboard.getBoardInnerHtml();
            const checkHorisontalLines = () => {
                return (
                    Operator.isEqualMatrixVal(boardInnerHtml, [[0, 0], [0, 1], [0, 2]]) ||
                    Operator.isEqualMatrixVal(boardInnerHtml, [[1, 0], [1, 1], [1, 2]]) ||
                    Operator.isEqualMatrixVal(boardInnerHtml, [[2, 0], [2, 1], [2, 2]])
                )
            }
            const checkVericalLines = () => {
                return (
                    Operator.isEqualMatrixVal(boardInnerHtml, [[0, 0], [1, 0], [2, 0]]) ||
                    Operator.isEqualMatrixVal(boardInnerHtml, [[0, 1], [1, 1], [2, 1]]) ||
                    Operator.isEqualMatrixVal(boardInnerHtml, [[0, 2], [1, 2], [2, 2]])
                )
            }
            const checkDiagonalLines = () => {
                return (
                    Operator.isEqualMatrixVal(boardInnerHtml, [[0, 0], [1, 1], [2, 2]]) ||
                    Operator.isEqualMatrixVal(boardInnerHtml, [[0, 2], [1, 1], [2, 0]])
                )
            }
            return (checkVericalLines() || checkHorisontalLines() || checkDiagonalLines())
        }
        return {
            restartGame,
            checkGameResult,
            startGame,
            doMove,
        }
    })();

    const btnRestart = document.querySelector('.restart-game-btn');
    btnRestart.addEventListener('click',  Controller.restartGame);
    const btnStart = document.querySelector('.start-game-btn');
    btnStart.addEventListener('click',  Controller.startGame);

    const gameboard = Gameboard();
    
}());
