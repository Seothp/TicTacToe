(function(){
    const Player = (name, move) => {
        return {name, move}
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
        return {
            renderMessage,
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
        const switchPlayerMove = () => {
            Players.currentPlayer = Players.currentPlayer == players[0] ? 
            Players.currentPlayer = players[1]: 
            Players.currentPlayer = players[0];
            Message.renderMessage();
            checkGameResult();
            
        }
        const doMove = (e) => {
            let target = e.target;
            if(target.textContent === "") {
                target.textContent = Players.currentPlayer.move;
                switchPlayerMove();
            }
        }
        const checkGameResult = () => {
            const boardInnerHtml = gameboard.getBoardInnerHtml()
            isEqualMatrixVal(boardInnerHtml, [[0, 0], [0, 1], [0, 2]])
            console.log(boardInnerHtml)
        }
        return {
            checkGameResult,
            startGame,
            switchPlayerMove,
            doMove,
        }
    })();

    const gameboard = Gameboard();
    Players.createPlayers(["Vanya", "Zaur"]);
    controller.startGame();
    Message.renderMessage();
}());
