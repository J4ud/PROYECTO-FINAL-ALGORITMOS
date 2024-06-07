import './foroscard.css';

class ForosCard extends HTMLElement {
  message?: string;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['message'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'message') {
      this.message = newValue;
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            margin: 10px 0;
            padding: 20px;
            background-color: #191916;
            border-radius: 5px;
            color: #FFFFFF;
            font-family: 'Arial', sans-serif;
          }
        </style>
        <p>${this.message ?? ''}</p>
      `;
    }
  }
}

customElements.define('foros-card', ForosCard);
export default ForosCard;