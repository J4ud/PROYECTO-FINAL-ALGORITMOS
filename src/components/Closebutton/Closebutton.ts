// close-button.ts

class CloseButton extends HTMLElement {
    constructor() {
        super();
        const button = document.createElement('button');
        button.classList.add('close-button');
        // Cambiar el contenido del botón a un círculo
        
        this.appendChild(button);
    }
}
export default CloseButton;
customElements.define('close-button', CloseButton);
