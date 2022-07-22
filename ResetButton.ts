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

export const button = new ResetButton
