enum STATUS {
    AVAILABLE = 'AVAILABLE',
    OCCUPIEDP1 = 'OCCUPIEDP1',
    OCCUPIEDP2 = 'OCCUPIEDP2',
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
}

class PositionMap { // See L10 8:30
    rows: Row[]
    selectedSeats: number[] = []
    element: HTMLDivElement

    constructor(rowNumber: number, positionNumberPerRow: number, occupiedPositions: number[] = []){
        this.rows = Array.from({length: rowNumber}).map((_, index) => {
            return new Row(index, positionNumberPerRow)
        })
        this.element = document.createElement('div')
        this.element.classList.add('position-map')
        this.element.append(...this.rows.map((row) => row.element))
    }
}

const positionMap = new PositionMap(5, 10);
document.getElementById('gameboard')?.appendChild(positionMap.element)


