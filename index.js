(function(){
    const Player = (move) => {
        return {move}
    }
    
    const Gameboard = {
        board: [],
        boardCellFabric () {
            let board = document.createElement('div');
            board.classList = 'board__cell';
            board.addEventListener('click', (e) => controller.doMove(e));
            return board;
        },
        generateBoard (num) {
            for (let i = 0; i < num*num; i++) {
                this.board.push(this.boardCellFabric());
            }
        },
        renderBoard () {
            let board = this.getBoardRoot();
            for (let i = 0; i < this.board.length; i++) {
                board.append(this.board[i]);
            }
        },
        getBoardRoot () {
            return document.querySelector('.board');
        },
        
    }
    
    const controller = {
        players: [
            Player("x"),
            Player("o"),
        ],
        setFirstMove() {
            this.currentPlayer = this.players[0];
        },
        switchPlayerMove() {
            this.currentPlayer = this.currentPlayer == this.players[0] ? 
                this.currentPlayer = this.players[1]: 
                this.currentPlayer = this.players[0];
        },
        doMove (e) {
            let target = e.target;
            if(target.textContent === "") {
                target.textContent = this.currentPlayer.move;
                this.switchPlayerMove();
            }
        },
    }
    controller.setFirstMove();
    Gameboard.generateBoard(3);
    Gameboard.renderBoard();
}());

