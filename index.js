class Game {
    constructor(name1, name2) {
        this.players = [
            {
                moveType: 'x',
                name: name1
            }, {
                moveType: 'o',
                name: name2
            }
        ]
        this.currentPlayer = this.players[0]
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
        console.log('game has ended', this.currentPlayer.name, 'is won')
        const modalContent = modalEnd.querySelector('.modal-content')
        modalContent.textContent = `Game has ended, ${this.currentPlayer.name} is won`
        modalEnd.classList.toggle('hidden')
    }
    render() {
        const board = document.getElementById('board')
        board.textContent = ''
        this.gameboard.forEach(el => board.append(el))
    }
}
const newGameButton = document.querySelector('.new-game-btn')
const startGameButton = document.querySelector('.start-game-btn')
const restartGameButton = document.querySelector('restart-game-btn')
const modalStart = document.querySelector('.start-modal')
const modalEnd = document.querySelector('.end-modal')
const modal = document.getElementsByClassName('modal-wrapper')
Array.from(modal).forEach(modal => {
    modal.addEventListener('click', ({ target }) => {
        const isWrapper = target.className.indexOf('modal-wrapper') !== -1
        if (isWrapper) {
            target.classList.toggle('hidden')
        }
    })
})

newGameButton.addEventListener('click', e => {
    modalStart.classList.toggle('hidden')
})
startGameButton.addEventListener('click', e => {
    const firstName = document.getElementById('first-player-name').value
    const secondName = document.getElementById('second-player-name').value
    const game = new Game(firstName, secondName)
    game.startGame()
    modalStart.classList.toggle('hidden')
})