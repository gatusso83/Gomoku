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

export const boardButton = new BoardSizeButton