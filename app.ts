import { forEachChild, setConstantValue } from "typescript"

console.log("hi2")

enum STATUS {
    AVAILABLE = 'AVAILABLE',
    OCCUPIEDP1 = 'OCCUPIEDP1',
    OCCUPIEDP2 = 'OCCUPIEDP2',
    OCCUPIED = 'OCCUPIED',
    SELECTED = 'SELECTED'
}

class Position {
    id: number
    status: STATUS
    element: HTMLDivElement

    constructor(id: number, isOccupiedP1: boolean = false, isOccupiedP2: boolean = false) {
        this.id = id
        this.status = isOccupiedP1 ? STATUS.OCCUPIEDP1: STATUS.AVAILABLE // need to add OCCUPIEDP2
        // Need to check status somehow.
        this.element = document.createElement('div')
        this.element.classList.add('position')
        this.element.classList.add(this.status.toLowerCase())
        this.element.addEventListener('click', () => {
            this.handleClick()
        })
    }   

    handleClick() {
        if (this.status === STATUS.OCCUPIED) return
        this.element.classList.remove(this.status.toLowerCase())
        this.status =STATUS.SELECTED
        this.element.classList.add(this.status.toLowerCase())
    }

    handleReset() {
        this.status = STATUS.AVAILABLE
        this.element.classList.add(this.status.toLowerCase())
    }

    get isSelected() {
        return this.status === STATUS.SELECTED
    }
}

class Row {
    id: number
    positions: Position[]
    element: HTMLDivElement

    constructor(id: number, positionNumber: number) {
        this.id = id
        this.positions = Array.from({length: positionNumber}).map((_, index) => {
            const positionId = positionNumber * id + index
            return new Position(positionId)
        })
        this.element = document.createElement('div')
        this.element.classList.add('row')
        this.element.append(...this.positions.map((position) => position.element))
    }

    get selectedPositionsId() {
        return this.positions.filter((position) => position.isSelected).map((position) => position.id ) 
    }
}

class PositionMap { // See L10 8:30
    rows: Row[]
    selectedPositions: number[] = []
    element: HTMLDivElement

    constructor(rowNumber: number, positionsPerRow: number){ 
        this.rows = Array.from({length: rowNumber}).map((_, index) => {
            return new Row(index, positionsPerRow)
        })
        this.element = document.createElement('div')
        this.element.classList.add('position-map')
        this.element.append(...this.rows.map((row) => row.element))
        this.element.addEventListener('click', () => this.getSelectedPositionsId())
    }

    getSelectedPositionsId() {
        this.selectedPositions = this.rows.map(row => row.selectedPositionsId).flat()
        console.log(`Selected positions: ${this.selectedPositions.join(',')}`)
    }
}

// class Message {
//     element: HTMLDivElement

//     constructor(){
//         this.element = document.createElement('div')
//         this.element.classList.add('ui')
//         this.element
//     }

// }



const positionMap = new PositionMap(15, 15);
document.getElementById('game')?.appendChild(positionMap.element)


class ResetButton {
    element: HTMLButtonElement
    text: string = "Reset"

    constructor(){
        this.element = document.createElement('button')
        this.element.classList.add('buttonReset')
        this.element.innerHTML = "Reset"
        this.element.addEventListener('click', () => {
            this.handleClick()
        })
    }

    handleClick() {location.reload()

        // console.log("Reset clicked")
        // console.log(positionMap.selectedPositions)
        // document.getElementById('position')?.classList.remove('available')      
            
    }
        //positionMap.selectedPositions = []  // Positions are still selected
        //console.log(positionMap.selectedPositions)
}


const button = new ResetButton
document.getElementById('game')?.appendChild(button.element)


