import { forEachChild, getCombinedNodeFlags, setConstantValue } from "typescript"

//console.log("hi2")


enum STATUS {
    AVAILABLE = 'AVAILABLE',
    OCCUPIEDP1 = 'OCCUPIEDP1',
    OCCUPIEDP2 = 'OCCUPIEDP2',
    SELECTED = 'SELECTED'
}

class State {
    p1Turn: boolean = true
    win: boolean = false
    draw: boolean = false

    constructor() {
        this.p1Turn = true
        this.win = false
        this.draw = false
    }

    winState() {

    }


}

class Position {
    id: number
    status: STATUS
    element: HTMLDivElement

    constructor(id: number, isOccupiedP1: boolean = false, isOccupiedP2: boolean = false) {
        this.id = id
        this.status = isOccupiedP1 ? STATUS.OCCUPIEDP1 : STATUS.AVAILABLE // need to add OCCUPIEDP2
        // Need to check status somehow.
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
        if (state.p1Turn === true) {
            checkForWin.wincheck(positionMap.p1SelectedPositions)
            state.p1Turn = false
            this.status = STATUS.OCCUPIEDP1
            message.element.innerText = "Player 2's turn"
        }
        else {
            state.p1Turn = true
            checkForWin.wincheck(positionMap.p1SelectedPositions)
            this.status = STATUS.OCCUPIEDP2
            message.element.innerText = "Player 1's turn"
        }

        console.log(`P1 state ${state.p1Turn}`)
        console.log(`Message ${message.element.innerHTML}`)

        this.element.classList.add(this.status.toLowerCase())
    }

    get isSelected() {
        if (state.p1Turn === true)
            return this.status === STATUS.OCCUPIEDP1
        else
            return this.status === STATUS.OCCUPIEDP2
    }
}

class Row {
    id: number
    positions: Position[]
    element: HTMLDivElement

    constructor(id: number, positionNumber: number) {
        this.id = id
        this.positions = Array.from({ length: positionNumber }).map((_, index) => {
            const positionId = positionNumber * id + index
            return new Position(positionId)
        })
        this.element = document.createElement('div')
        this.element.classList.add('row')
        this.element.append(...this.positions.map((position) => position.element))
    }

    get selectedPositionsId() {
        return this.positions.filter((position) => position.isSelected).map((position) => position.id)
    }
}

class PositionMap {
    rows: Row[]
    p1SelectedPositions: number[] = []
    p2SelectedPositions: number[] = []
    element: HTMLDivElement

    constructor(rowNumber: number, positionsPerRow: number) {
        this.rows = Array.from({ length: rowNumber }).map((_, index) => {
            return new Row(index, positionsPerRow)
        })
        this.element = document.createElement('div')
        this.element.classList.add('position-map')
        this.element.append(...this.rows.map((row) => row.element))
        this.element.addEventListener('click', () => this.getSelectedPositionsId())
    }

    getSelectedPositionsId() {
        if (state.p1Turn === true) {
            this.p1SelectedPositions = this.rows.map((row) => row.selectedPositionsId).flat()
            //console.log(`P2 Selected positions: ${this.p2SelectedPositions.join(',')}`)
            console.log(`P1 Selected positions: ${this.p1SelectedPositions.join(',')}`)

        }
        else {
            this.p2SelectedPositions = this.rows.map((row) => row.selectedPositionsId).flat()
            console.log(`P2 Selected positions: ${this.p2SelectedPositions.join(',')}`)
            // console.log(`P1 Selected positions: ${this.p1SelectedPositions.join(',')}`)

        }
    }
}



class Message {
    element: HTMLParagraphElement
    text: string = "Player 1's turn"

    constructor() {
        this.element = document.createElement('p')
        this.element.classList.add('message')
        this.element.setAttribute('id', 'message')
        this.element.innerHTML = this.text
    }
}

class ResetButton {
    element: HTMLButtonElement
    btnText: string = "Reset Game"

    constructor() {
        this.element = document.createElement('button')
        this.element.classList.add('buttonReset')
        this.element.innerText = this.btnText
        this.element.addEventListener('click', () => {
            location.reload()
        })
    }
}

class CheckForWin {
    p1List: number[]
    p2List: number[]

    constructor() {
    }

    wincheck(list: number[]): boolean { //Can just run this function in the on click in the position and run against each list
        if (list.length >= 2) {
            state.win = true
            positionMap.element.classList.remove('position')
            console.log("Winner Winner chicken dinner")
            return true
        }
        return false
    }


}





const positionMap = new PositionMap(15, 15);
document.getElementById('game')?.appendChild(positionMap.element)

const message = new Message
document.getElementById('game')?.appendChild(message.element)

const button = new ResetButton
document.getElementById('game')?.appendChild(button.element)

const state = new State
const checkForWin = new CheckForWin

//console.log(`P1 state ${state.p1Turn}`)

