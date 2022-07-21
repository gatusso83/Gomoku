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
        if (state.p1Turn === true && state.win === false) {
            this.status = STATUS.OCCUPIEDP1
            this.element.classList.add(this.status.toLowerCase())
            message.element.innerText = "Player 2's turn"
            state.p1Turn = false
        }

        else if (state.p1Turn === false && state.win == false) {
            this.status = STATUS.OCCUPIEDP2
            this.element.classList.add(this.status.toLowerCase())
            message.element.innerText = "Player 1's turn"
            state.p1Turn = true
        }
        else {
            return
        }
    }

    get isSelected() {
        if (state.p1Turn === false) {
            return this.status === STATUS.OCCUPIEDP1
        }
        else {
            return this.status === STATUS.OCCUPIEDP2
        }
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
    columns: number
    p1SelectedPositions: number[] = []
    p2SelectedPositions: number[] = []
    element: HTMLDivElement

    constructor(rowNumber: number, positionsPerRow: number) {
        this.rows = Array.from({ length: rowNumber }).map((_, index) => {
            return new Row(index, positionsPerRow)
        })
        this.columns = positionsPerRow
        this.element = document.createElement('div')
        this.element.classList.add('position-map')
        this.element.append(...this.rows.map((row) => row.element))
        this.element.addEventListener('click', () => this.getSelectedPositionsId())
    }

    getSelectedPositionsId() {
        if (state.p1Turn === false) {
            this.p1SelectedPositions = this.rows.map((row) => row.selectedPositionsId).flat()
            //console.log(`P2 Selected positions: ${this.p2SelectedPositions.join(',')}`)
            // console.log(`P1 Selected positions: ${this.p1SelectedPositions.join(',')}`)

        }
        else {
            this.p2SelectedPositions = this.rows.map((row) => row.selectedPositionsId).flat()
            // console.log(`P2 Selected positions: ${this.p2SelectedPositions.join(',')}`)
            console.log(`P2 Selected positions: ${this.p2SelectedPositions}`)
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
    columns: number = positionMap.columns
    rows: number = positionMap.rows.length


    constructor() {
        addEventListener('click', () => this.checkWin())

    }

    checkWin() {
        this.p1List = positionMap.p1SelectedPositions
        this.p2List = positionMap.p2SelectedPositions
        console.log(this.p1List)
        console.log(this.p2List)
        console.log(`P1 Selected positions: ${positionMap.p1SelectedPositions.join(',')}`)
        if (state.p1Turn == false)
            this.checkForFive(this.p1List)
        else
            this.checkForFive(this.p2List)
    }


    ///// THIS IS WORKING FOR P1, NEED TO HAVE THE FUCNTION CHECK 
    checkForFive(list: number[]) {

        console.log(`Rows: ${this.rows}`)
        console.log(`Columns: ${this.columns}`)

        let desDiagIncrement: number = this.columns + 1
        let ascDiagIncrement: number = this.columns - 1
        let verticalIncrement: number = this.columns
        let horizontalIncrement: number = 1

        console.log(`Checking in winCheckP1 Selected positions: ${positionMap.p1SelectedPositions.join(',')}`)
        list.forEach(element => {

            //Descending diagonal \ code
            if (list.includes(element + desDiagIncrement) && list.includes(element + 2 * desDiagIncrement) && +
                list.includes(element + 3 * desDiagIncrement) && list.includes(element + 4 * desDiagIncrement)) {
                state.win = true
            }

            //Ascending diagonal / code
            if (list.includes(element - ascDiagIncrement) && list.includes(element - 2 * ascDiagIncrement) && +
                list.includes(element - 3 * ascDiagIncrement) && list.includes(element - 4 * ascDiagIncrement)) {
                state.win = true
            }

            //Vertical | code
            if (list.includes(element + verticalIncrement) && list.includes(element + 2 * verticalIncrement) && +
                list.includes(element + 3 * verticalIncrement) && list.includes(element + 4 * verticalIncrement)) {
                state.win = true
            }

            //Horizontal - code
            if (list.includes(element + horizontalIncrement) && list.includes(element + 2 * horizontalIncrement) && +
                list.includes(element + 3 * horizontalIncrement) && list.includes(element + 4 * horizontalIncrement) && +
                ((element + 4 * horizontalIncrement) % this.columns != 0) && ((element + 3 * horizontalIncrement) % this.columns != 0) && +
                ((element + 2 * horizontalIncrement) % this.columns != 0) && ((element + 1 * horizontalIncrement) % this.columns != 0)) {
                state.win = true
            }

        })

        if (state.p1Turn == false && state.win == true)
            message.element.innerText = "Player 1 Wins!!!!!!!"
        else if (state.p1Turn == true && state.win == true)
            message.element.innerText = "Player 2 Wins!!!!!!!"
    }

}

class GameSizeUI {
    element: HTMLDivElement
    button: HTMLButtonElement

    constructor() {
        this.element = document.createElement('div')
        this.element.classList.add('ui')



        //this.button = document.createElement('button')
        //this.element.classList.add('sizeButton')



        //this.element.classList.add('buttonReset')

    }
}

class SizeButton {
    element: HTMLButtonElement
    element2: HTMLDivElement
    btnText: string = "Change size of board"
    options: number[]

    constructor() {
        this.element = document.createElement('button')
        this.element.classList.add('buttonSize')
        this.element.innerText = this.btnText
        this.element.setAttribute('id', 'buttonSize')
        this.element.addEventListener('click', () => {
            this.handleClick()
        })
        this.element2 = document.createElement('div')
        this.element2.classList.add('dropdown')
    }

    handleClick() {
        this.element2.classList.toggle('show')


    }
}


const positionMap = new PositionMap(10, 10);
document.getElementById('game')?.appendChild(positionMap.element)

const checkForWin = new CheckForWin

const message = new Message
document.getElementById('game')?.appendChild(message.element)

const button = new ResetButton
document.getElementById('game')?.appendChild(button.element)

const uiButton = new SizeButton
document.getElementById('game')?.appendChild(uiButton.element)
document.getElementById('buttonSize')?.appendChild(uiButton.element2)
//document.getElementById('ui')?.appendChild(button.element)

const state = new State




//console.log(`P1 state ${state.p1Turn}`)

