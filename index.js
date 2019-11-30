(function(){
    const Player = (name, move) => {
        return {name, move}
    }
    
    const Gameboard = () => {
        let board = [];
        const boardCellFabric = () => {
            let board = document.createElement('div');
            board.classList = 'board__cell';
            board.addEventListener('click', (e) => controller.doMove(e));
            return board;
        }
        const generateBoard = (num) => {
            for (let i = 0; i < num*num; i++) {
                board.push(boardCellFabric());
            }
        }
        const renderBoard = () => {
            gameboard.generateBoard(3);
            let boardRoot = getBoardRoot();
            for (let i = 0; i < board.length; i++) {
                boardRoot.append(board[i]);
            }
        }
        const getBoardRoot = () => {
            return document.querySelector('.board');
        }
        const getBoard = () => {
            return board;
        }
        return {
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
            const boardHTML = gameboard.getBoard().map((el)=>{
                return el.innerHTML;
            });
            console.log(boardHTML);
            if (boardHTML[0] !=='' && boardHTML[0] === boardHTML[1] && boardHTML[0] === boardHTML[2]) {
                console.log("end game");
            }
            if (boardHTML[3] !=='' && boardHTML[3] === boardHTML[4] && boardHTML[3] === boardHTML[5]) {
                console.log("end game");
            }
            if (boardHTML[6] !=='' && boardHTML[6] === boardHTML[7] && boardHTML[6] === boardHTML[8]) {
                console.log("end game");
            }
            
            if (boardHTML[0] !=='' && boardHTML[0] === boardHTML[3] && boardHTML[0] === boardHTML[6]) {
                console.log("end game");
            }
            if (boardHTML[1] !=='' && boardHTML[1] === boardHTML[4] && boardHTML[1] === boardHTML[7]) {
                console.log("end game");
            }
            if (boardHTML[2] !=='' && boardHTML[2] === boardHTML[5] && boardHTML[2] === boardHTML[8]) {
                console.log("end game");
            }
            if (boardHTML[0] !=='' && boardHTML[0] === boardHTML[4] && boardHTML[0] === boardHTML[8]) {
                console.log("end game");
            }
            if (boardHTML[2] !=='' && boardHTML[2] === boardHTML[4] && boardHTML[2] === boardHTML[6]) {
                console.log("end game");
            }
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
