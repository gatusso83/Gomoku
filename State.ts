class State {
    p1Turn: boolean = true
    win: boolean = false
    draw: boolean = false

    constructor() {
        this.p1Turn = true
        this.win = false
        this.draw = false
    }
}

export const state = new State