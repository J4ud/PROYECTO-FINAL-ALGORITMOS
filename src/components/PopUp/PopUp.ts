// <banner></banner>
import styles from './Popup.css'
export enum Attr {
  'userName' = 'userName',
  'uid'= 'uid',
  'image'= 'image',
  'email'= 'email',
  'gender'= 'gender',
  'ip_address'='ip_address'
}

class Popup extends HTMLElement {
    uid?: number;
    userName?: string;
    image?: string;
    email?: string;
    gender?: string;
    ip_address?: string;

  constructor() {
    super(); // always call super() first in the ctor.
    this.attachShadow({mode: 'open'})
    
  }
  static get observedAttributes(){
    const attrs: Record<Attr,null> = {
      uid: null,
      userName: null,
      image: null,
      email: null,
      gender: null,
      ip_address: null,
    }
    return Object.keys(attrs);
    }

    attributeChangedCallback(propName: Attr, oldVal: string | undefined, newVal:string | undefined) {
      switch (propName) {
        case Attr.uid:
            this.uid = newVal ? Number(newVal): undefined;
          break;
      
        default:
            this[propName] = newVal;
          break;
      }
      this.render();
    }
  

  render(){
    if (this.shadowRoot) {
        // Limpiar el contenido existente en el shadowRoot
        this.shadowRoot.innerHTML = `<div class="popUp">
        <div class="popup-content">
          <h2>${this.userName}</h2>
          <img src="${this.image}" alt="User Image">
          <p>Email: ${this.email}</p>
          <!-- Otros datos si son necesarios -->
          <button class="close-button">Close</button>
        </div>
      </div>`;

        const css = this.ownerDocument.createElement("style");
        css.textContent = `
          
            .popUp {
              position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    z-index: 1000;
                    display: flex;
                    justify-content: center;
                    align-items: center;
            }
            .popup-content {
              background-color: white;
              width: 70%;
              max-width: 600px;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
              display: flex;
          }
            
        `;

        this.shadowRoot?.appendChild(css);

        const closeButton = this.shadowRoot?.querySelector('.close-button');
    closeButton?.addEventListener('click', () => {
      this.remove(); // Remover el pop-up del DOM al hacer clic en el botón
    });
        
 }
}
connectedCallback() {
  this.render()
  // Agrega el event listener al botón de cerrar el pop-up
  const closeButton = this.shadowRoot?.querySelector('.close-button');
  closeButton?.addEventListener('click', this.close.bind(this));
}

close() {
  this.parentNode?.removeChild(this);
}

}

export default Popup;
window.customElements.define('my-popup', Popup);