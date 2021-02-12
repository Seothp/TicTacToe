const CIRCLE = `
    <div class="circle" style="
        display: block; 
        border-radius: 50%; 
        border: 8px solid black; 
        width: 75px; 
        height: 75px;
    "></div>
`
const CROSS = `
    <div class="cross" style="position: relative; width: 75px; height: 75px;">
        <div class="cross-line1" style=
            "position: absolute; 
            top: 50%; 
            left: 50%;
            width: 100px;
            height: 8px;
            transform: translate(-50%, 50%) rotate(45deg);
            background: black;"
        ></div>
        <div class="cross-line2" style=
            "position: absolute; 
            top: 50%; 
            left: 50%; 
            width: 100px;
            height: 8px;
            transform: translate(-50%, 50%) rotate(-45deg);
            background: black;"
        ></div>
    </div>
`
class Game {
    constructor(name1, name2) {
        this.moves = {
            o: CIRCLE,
            x: CROSS,
        }
        this.players = [
            {
                moveType: this.moves['o'],
                name: name1
            }, {
                moveType: this.moves['x'],
                name: name2
            }
        ]
        this.currentPlayer = this.players[0]
        this.board = document.getElementById('board')
        this.endGameModal = new bootstrap.Modal(document.getElementById('endGameModal'))
    }
    gameboard = []
    startGame() {
        console.log('game has been started')
        this.gameboard = []
        this.generateBoard()     
        this.render()
    }
    toggleCurrentPlayer() {
        const firstPlayer = this.players[0]
        const secondPlayer = this.players[1]
        this.currentPlayer = this.currentPlayer === firstPlayer? 
            secondPlayer: 
            firstPlayer
    }
    fillCeil(target) {
        target.innerHTML = this.currentPlayer.moveType
    }
    disableCeil(target) {
        target.disabled = true
    }
    handleCeilClick = ({ target }) => {
        this.disableCeil(target)
        this.fillCeil(target)
        if(this.isGameEnded()) {
            this.endGame()
            return
        }
        this.toggleCurrentPlayer()
    }
    generateCeil() {
        const ceil = document.createElement('button');
        ceil.addEventListener('click', this.handleCeilClick);
        ceil.textContent = ''
        ceil.classList = 'board__cell';
        return ceil
    }
    generateBoard() {
        for (let i = 0; i < 9; i++) {
            this.gameboard.push(this.generateCeil())
        }
    }
    isEqualGameboardCeils(firstPos, secondPos, thirdPos) {
        const firstEl = this.gameboard[firstPos].textContent
        const secondEl = this.gameboard[secondPos].textContent
        const thirdEl = this.gameboard[thirdPos].textContent
        const isCeilsEmpty = this.gameboard[firstPos].textContent === ''
        return (!isCeilsEmpty && 
            (firstEl === secondEl) &&
            (firstEl === thirdEl))
    }
    isEqualVerticalLines() {
        return this.isEqualGameboardCeils(0, 3, 6) ||
            this.isEqualGameboardCeils(1, 4, 7) ||
            this.isEqualGameboardCeils(2, 6, 8)
    }
    isEqualHorisontalLines() {
        return this.isEqualGameboardCeils(0, 1, 2) ||
            this.isEqualGameboardCeils(3, 4, 5) ||
            this.isEqualGameboardCeils(6, 7, 8)
    }
    isEqualDiagonalLines() {
        return this.isEqualGameboardCeils(0, 4, 8) ||
        this.isEqualGameboardCeils(2, 4, 6)
    }
    isGameEnded() {
        return this.isEqualDiagonalLines() ||
            this.isEqualHorisontalLines() ||
            this.isEqualVerticalLines()
    }
    endGame() {
        console.log()
        console.log(this.endGameModal._element)
        const modalBody = this.endGameModal._element.querySelector('#end-game-body')
        modalBody.textContent = `game has ended ${this.currentPlayer.name} is won`
        this.endGameModal.toggle()
    }
    render() {
        this.board.textContent = ''
        this.gameboard.forEach(el => board.append(el))
    }
}
const startGameButton = document.querySelector('.start-game-btn')
const restartGameButton = document.querySelector('restart-game-btn')

startGameButton.addEventListener('click', e => {
    const firstName = document.getElementById('first-player-name').value
    const secondName = document.getElementById('second-player-name').value
    const game = new Game(firstName, secondName)
    game.startGame()
})