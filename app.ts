import { forEachChild, getCombinedNodeFlags, setConstantValue } from "typescript"

import { positionMap as posMap } from './PositionMap'
import { message as gameMessage } from './Message'
import { button as resetButton } from './ResetButton'
import { boardButton as boardButton } from './BoardSizeButton'
import CheckForWin from "./CheckForWin"

const checkForWin = new CheckForWin

document.getElementById('game')?.appendChild(posMap.element)
document.getElementById('game')?.appendChild(gameMessage.element)
document.getElementById('game')?.appendChild(resetButton.element)
document.getElementById('game')?.appendChild(boardButton.element)
document.getElementById('buttonSize')?.appendChild(boardButton.element2)
