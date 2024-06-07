import '../Card/Card.css';
import Popup from '../PopUp/PopUp';
import styles from '../PopUp/Popup.css';
import { appState, addObserver, dispatch } from '../../store/store';
import { getPostsAction } from '../../store/actions';

export enum Attr {
  'userName' = 'userName',
  'id' = 'id',
  'image' = 'image',
  'description' = 'description',
  'email' = 'email',
  'gender' = 'gender',
  'ip_address' = 'ip_address'
}

class ProfilePosts extends HTMLElement {
  uid?: number;
  userName?: string;
  image?: string;
  description?: string;
  email?: string;
  gender?: string;
  ip_address?: string;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    addObserver(this);
  }

  static get observedAttributes() {
    const attrs: Record<Attr, null> = {
      id: null,
      userName: null,
      image: null,
      description: null,
      email: null,
      gender: null,
      ip_address: null,
    };
    return Object.keys(attrs);
  }

  attributeChangedCallback(propName: Attr, oldVal: string | undefined, newVal: string | undefined) {
    if (oldVal !== newVal) {
      switch (propName) {
        case Attr.id:
          this.uid = newVal ? Number(newVal) : undefined;
          break;
        default:
          this[propName] = newVal;
          break;
      }
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (this.shadowRoot) {
      // Limpiar el contenido existente en el shadowRoot
      this.shadowRoot.innerHTML = '';

      const css = this.ownerDocument.createElement('style');
      css.textContent = `
        .card {
          background-color: rgb(255, 255, 255, 0);
          width: 100%;
          max-width: 100%;
          border-radius: 0em;
          margin-bottom: 20px;
          overflow: hidden;
          position: relative;
          display: inline-block;
        }

        img {
          width: 100%;
          height: auto;
        }

        .image-button img {
          width: 100%;
          margin-bottom: 0;
        }

        button {
          width: 100%;
          background-color: transparent;
          border: none;
          padding: 0;
          cursor: pointer;
          display: inline-block;
        }

        #button-close {
          padding: 0.5em;
          background-color: white;
          color: black;
        }

        .none {
          display: none;
        }

        .display {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1;
        }
      `;

      // Adjuntar el estilo al shadowRoot
      this.shadowRoot.appendChild(css);

      const cardDiv = this.ownerDocument.createElement('div');
      cardDiv.className = 'card';

      const image = this.ownerDocument.createElement('img');
      image.src = this.image || '';
      image.alt = 'Character Image';

      const buttonImage = this.ownerDocument.createElement('button');
      buttonImage.className = 'image-button';

      buttonImage.appendChild(image);

      cardDiv.appendChild(buttonImage);
      this.shadowRoot.appendChild(cardDiv);

      buttonImage.addEventListener('click', () => {
        // Obtener el post correspondiente del appState
        const post = appState.posts.find((post: any) => post.id === this.uid) as any;

        if (post) {
          // Crear una instancia de Popup
          const popup = new Popup();
          popup.setAttribute(Attr.image, post.image);
          popup.setAttribute(Attr.userName, post.userName);
          popup.setAttribute(Attr.description, post.description);
          popup.className = 'card';

          // Agregar el pop-up al body del documento
          document.body.appendChild(popup);
        }
      });
    }
  }
}
export default ProfilePosts;
customElements.define('profile-posts', ProfilePosts);
