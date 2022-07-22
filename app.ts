import { forEachChild, getCombinedNodeFlags, setConstantValue } from "typescript"

import { positionMap as posMap } from './PositionMap'
import { message as gameMessage } from './Message'
import { button as resetButton } from './ResetButton'
import CheckForWin from "./CheckForWin"

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

class BoardSizeButton {
    element: HTMLButtonElement
    element2: HTMLDivElement
    btnText: string = "Change size of board"
    options: Array<[number, number]> = [[5, 5], [6, 6], [7, 7]]

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

const checkForWin = new CheckForWin

document.getElementById('game')?.appendChild(posMap.element)

document.getElementById('game')?.appendChild(gameMessage.element)

document.getElementById('game')?.appendChild(resetButton.element)

const boardSizeButton = new BoardSizeButton
document.getElementById('game')?.appendChild(boardSizeButton.element)
document.getElementById('buttonSize')?.appendChild(boardSizeButton.element2)
