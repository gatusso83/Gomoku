import Row from './Row'
import { state as gameState } from './State'
//import State from './State'

// const gameState = state

export default class PositionMap {
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
        if (gameState.p1Turn == false)
            this.p1SelectedPositions = this.rows.map((row) => row.selectedPositionsId).flat()
        else
            this.p2SelectedPositions = this.rows.map((row) => row.selectedPositionsId).flat()
    }
}

export const positionMap = new PositionMap(15, 15);
document.getElementById('game')?.appendChild(positionMap.element)
