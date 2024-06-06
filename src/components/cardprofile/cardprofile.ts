import './cardprofile.css';
export enum Attr {
  'userName' = 'userName',
  'image' = 'image',
}

class Card extends HTMLElement {
  userName?: string;
  image?: string;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    const attrs: Record<Attr, null> = {
      userName: null,
      image: null,
    };
    return Object.keys(attrs);
  }

  attributeChangedCallback(propName: Attr, oldVal: string | undefined, newVal: string | undefined) {
    this[propName] = newVal;
    this.render();
  }

  render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = '';

      const style = document.createElement('style');
      style.textContent = `
        @import './Card.css';
      `;
      this.shadowRoot.appendChild(style);

      const cardDiv = document.createElement('div');
      cardDiv.className = 'card';

      const image = document.createElement('img');
      image.src = this.image || '';
      image.alt = 'User Image';

      const userName = document.createElement('div');
      userName.className = 'username';
      userName.textContent = this.userName || 'Username';

      cardDiv.appendChild(image);
      cardDiv.appendChild(userName);
      this.shadowRoot.appendChild(cardDiv);
    }
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    // Clean up if necessary
  }
}

export default Card;
customElements.define('picture-card', Card);