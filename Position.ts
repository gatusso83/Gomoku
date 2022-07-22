import { message as gameMessage } from './Message'
import { state as gameState } from './State'

enum STATUS {
    AVAILABLE = 'AVAILABLE',
    OCCUPIEDP1 = 'OCCUPIEDP1',
    OCCUPIEDP2 = 'OCCUPIEDP2',
    SELECTED = 'SELECTED'
}


export default class Position {
    id: number
    status: STATUS
    element: HTMLDivElement

    constructor(id: number) {
        this.id = id
        this.status = STATUS.AVAILABLE
        this.element = document.createElement('div')
        this.element.classList.add('position')
        this.element.classList.add(this.status.toLowerCase())
        this.element.addEventListener('click', () => {
            this.handleClick()
        })
    }

    handleClick() {
        if (this.status === STATUS.OCCUPIEDP1 || this.status === STATUS.OCCUPIEDP2) return
        this.element.classList.remove(this.status.toLowerCase())

        //Switch states so when an available space is clicked the correct color stone is placed
        if (gameState.p1Turn === true && gameState.win === false) {
            this.status = STATUS.OCCUPIEDP1
            this.element.classList.add(this.status.toLowerCase())
            gameMessage.element.innerText = "Player 2's turn"
            gameState.p1Turn = false
        }

        else if (gameState.p1Turn === false && gameState.win == false) {
            this.status = STATUS.OCCUPIEDP2
            this.element.classList.add(this.status.toLowerCase())
            gameMessage.element.innerText = "Player 1's turn"
            gameState.p1Turn = true
        }
        else {
            return
        }
    }

    get isSelected() {
        if (gameState.p1Turn === false) {
            return this.status === STATUS.OCCUPIEDP1
        }
        else {
            return this.status === STATUS.OCCUPIEDP2
        }
    }
}




