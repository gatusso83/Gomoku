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

export const message = new Message
