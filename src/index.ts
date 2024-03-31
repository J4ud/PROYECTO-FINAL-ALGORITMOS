import './index.css';
import { users } from "./data/data";
import "./components/index"
import Card, {Attr} from './components/Card/Card';

// <index></index>
class AppContainer extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    const css = this.ownerDocument.createElement("style");
    css.textContent = `
    .cards-container {
        max-width: 100%;
        column-count: 4;
        column-width: calc(20% - 5px);
        column-gap: 10px;
        margin: 10%
        
        
        
      }

      .card {
        width: 100%;
        height: auto;
        margin-bottom: 0px;
        object-fit: cover;
      }

      .card img {
        width: 100%;
        height: auto;
        display: block
      }
    `;

    this.shadowRoot?.appendChild(css);
    this.renderCharacters(users);
  }

  renderCharacters(data: any[]) {
    const cardsContainer = this.ownerDocument.createElement('div');
    cardsContainer.className = 'cards-container';

    data.forEach((user: any) => {
      const card = new Card();
      card.setAttribute(Attr.image, user.image);
      card.className = 'card';
      cardsContainer.appendChild(card);
    });

    this.shadowRoot?.appendChild(cardsContainer);
  }
}

customElements.define('app-container', AppContainer);