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
                    const first = matrix[params[i][0]][params[i][1]];
                    const second = matrix[params[i + 1][0]][params[i + 1][1]];
                    '' !== first && first === second ? result++: null;
                }
            }
            return result === params.length;
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
            board.addEventListener('click', (e) => controller.doMove(e));
            return board;
        }
        const generateBoard = () => {
            for (let i = 0; i < 3; i++) {
                board[0].push(boardCellFabric());
                board[1].push(boardCellFabric());
                board[2].push(boardCellFabric());
            }
            console.log(gameboard.getBoard());
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
        let players = [];
        const createPlayers = (names) => {
            players = [Player(names[0], "x"), Player(names[1], "o")];
        }
        const getPlayers = () => {
            return players;
        }
        const getCurrentPlayer = () => {
            return Players.currentPlayer;
        }
        return {
            getCurrentPlayer,
            createPlayers,
            getPlayers,
        }
    })();

    const controller = (() => {
        let players = [];
        const startGame = () => {
            gameboard.renderBoard();
            players = Players.getPlayers();
            Players.currentPlayer = players[0];
        }
        const endGame = () => {
            gameboard.getBoardRoot().innerHTML = "Игра окончена";
            Message.clearMessage();
        }
        const switchPlayerMove = () => {
            Players.currentPlayer = Players.currentPlayer == players[0] ? 
            Players.currentPlayer = players[1]: 
            Players.currentPlayer = players[0];
            Message.renderMessage();
            
        }
        const doMove = async (e) => {
            let target = e.target;
            if(target.textContent === "") {
                target.textContent = Players.currentPlayer.move;
                checkGameResult();
                switchPlayerMove();
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
            if (checkVericalLines() || checkHorisontalLines() || checkDiagonalLines()) {
                console.log('game is end');
                setTimeout(endGame, 1000);
            }
        }
        return {
            checkGameResult,
            startGame,
            switchPlayerMove,
            doMove,
        }
    })();

    const btn = document.querySelector('.restart-game-btn');
    btn.addEventListener('click',  controller.startGame);


    const gameboard = Gameboard();
    Players.createPlayers(["Vanya", "Zaur"]);
    controller.startGame();
    Message.renderMessage();
}());
