// MenuButton.ts
class MenuButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    connectedCallback() {
        const button = this.shadowRoot?.querySelector('button');
        button?.addEventListener('click', this.toggleMenu.bind(this));
    }

    toggleMenu() {
        this.dispatchEvent(new CustomEvent('menu-toggle', { bubbles: true, composed: true }));
    }

    render() {
        if(this.shadowRoot){
        this.shadowRoot.innerHTML = `
            <style>
                button {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    height: 30px;
                    width: 35px;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    padding: 0;
                    z-index: 9999;
                }
                span {
                    display: block;
                    height: 4px;
                    width: 100%;
                    background: white;
                    border-radius: 2px;
                }
                button:hover span {
                    background: #ccc;
                }
            </style>
            <button>
                <span></span>
                <span></span>
                <span></span>
            </button>
        `;
            }
    }
}

customElements.define('menu-button', MenuButton);
export default MenuButton;
