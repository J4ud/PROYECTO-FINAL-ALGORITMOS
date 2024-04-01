import navbarstyle from "./navbar.css"
class Navbar extends HTMLElement {
    private bar: string;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.bar = '';
    }

    static get observedAttributes(): string[] {
        return ["bar"];
    }

    connectedCallback(): void {
        this.render();
    }

    render(): void {
        const shadowRoot = this.shadowRoot;
        if (!shadowRoot) return;
    
        shadowRoot.innerHTML = `
        <style>
        ${navbarstyle}
        </style>
        <div class="navbar-container">
            <button id="menu-button">≡</button>
            <div class="navbar-title">${this.bar || 'Pallete'}</div>
        </div>
        `;
    }
    attributeChangedCallback(propName: string, oldValue: string, newValue: string): void {
        if (oldValue !== newValue) {
            if (propName === "bar") {
                this.bar = newValue;
            }
            this.render();
        }
    }
}

customElements.define("custom-navbar", Navbar);
export default Navbar;
