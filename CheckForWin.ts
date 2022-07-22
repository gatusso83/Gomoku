import { positionMap as posMap } from './PositionMap'
import { state as gameState } from './State'
import { message as gameMessage } from './Message'

export default class CheckForWin {
    p1List: number[]
    p2List: number[]
    columns: number = posMap.columns
    rows: number = posMap.rows.length

    constructor() {
        addEventListener('click', () => this.checkWinDraw())
    }

    checkWinDraw() {
        this.p1List = posMap.p1SelectedPositions
        this.p2List = posMap.p2SelectedPositions

        if (gameState.p1Turn == false)
            this.checkForFive(this.p1List)
        else
            this.checkForFive(this.p2List)

        if (gameState.win == false && ((this.p1List.length + this.p2List.length) == (this.rows * this.columns))) {
            gameState.draw = true
            gameMessage.element.innerText = "Game is a draw, click reset game"
        }
    }

    checkForFive(list: number[]) {
        let desDiagIncrement: number = this.columns + 1
        let ascDiagIncrement: number = this.columns - 1
        let verticalIncrement: number = this.columns
        let horizontalIncrement: number = 1

        list.forEach(element => {

            //Descending diagonal \ code
            if (list.includes(element + desDiagIncrement) && list.includes(element + 2 * desDiagIncrement) && +
                list.includes(element + 3 * desDiagIncrement) && list.includes(element + 4 * desDiagIncrement) && +
                ((element + 4 * desDiagIncrement) % this.columns != 0) && ((element + 3 * desDiagIncrement) % this.columns != 0) && +
                ((element + 2 * desDiagIncrement) % this.columns != 0) && ((element + 1 * desDiagIncrement) % this.columns != 0)) {
                gameState.win = true
            }

            //Ascending diagonal / code
            if (list.includes(element - ascDiagIncrement) && list.includes(element - 2 * ascDiagIncrement) && +
                list.includes(element - 3 * ascDiagIncrement) && list.includes(element - 4 * ascDiagIncrement) && +
                ((element - 4 * ascDiagIncrement) % this.columns != 0) && ((element - 3 * ascDiagIncrement) % this.columns != 0) && +
                ((element - 2 * ascDiagIncrement) % this.columns != 0) && ((element - 1 * ascDiagIncrement) % this.columns != 0)) {
                gameState.win = true
            }

            //Vertical | code
            if (list.includes(element + verticalIncrement) && list.includes(element + 2 * verticalIncrement) && +
                list.includes(element + 3 * verticalIncrement) && list.includes(element + 4 * verticalIncrement)) {
                gameState.win = true
            }

            //Horizontal - code
            if (list.includes(element + horizontalIncrement) && list.includes(element + 2 * horizontalIncrement) && +
                list.includes(element + 3 * horizontalIncrement) && list.includes(element + 4 * horizontalIncrement) && +
                ((element + 4 * horizontalIncrement) % this.columns != 0) && ((element + 3 * horizontalIncrement) % this.columns != 0) && +
                ((element + 2 * horizontalIncrement) % this.columns != 0) && ((element + 1 * horizontalIncrement) % this.columns != 0)) {
                gameState.win = true
            }
        })

        if (gameState.p1Turn == false && gameState.win == true)
            gameMessage.element.innerText = "Player 1 Wins!!!!!!!"
        else if (gameState.p1Turn == true && gameState.win == true)
            gameMessage.element.innerText = "Player 2 Wins!!!!!!!"
    }
}

