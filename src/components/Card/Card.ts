// <Card></Card>
import './Card.css';
import Popup from '../PopUp/PopUp';
import styles from '../PopUp/Popup.css'

export enum Attr {
  'userName' = 'userName',
  'uid'= 'uid',
  'image'= 'image',
  'email'= 'email',
  'gender'= 'gender',
  'ip_address'='ip_address'
}


class Card extends HTMLElement {
    uid?: number;
    userName?: string;
    image?: string;
    email?: string;
    gender?: string;
    ip_address?: string;
  

    
  constructor() {
    super();
    this.attachShadow({mode: 'open'}) // always call super() first in the ctor.
    
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


   

    
  
    render() {
      if (this.shadowRoot) {
        // Limpiar el contenido existente en el shadowRoot
        this.shadowRoot.innerHTML = '';

        const css = this.ownerDocument.createElement("style");
        css.textContent = `
        picture card{

        }
        .card {
          background-color: rgb(255, 255, 255);
          width: 100%; /* Ocupar el 100% del ancho del contenedor padre */
          max-width: 100%; /* Establecer un ancho máximo para evitar que las tarjetas se expandan demasiado */
          border-radius: 0em;
          margin-bottom: 20px; /* Espacio entre tarjetas */
          overflow: hidden; /* Evitar que el contenido se desborde */
          position: relative;
          display: inline-block;
      }
      
      img {
          width: 100%; /* La imagen ocupará todo el ancho de la tarjeta */
          height: auto; /* La altura se ajustará automáticamente para mantener la proporción */
      }
      
      button {
          width: 100%; /* El botón ocupará todo el ancho de la tarjeta */
          background-color: transparent; /* Fondo transparente para que no se vea */
          border: none; /* Sin borde */
          padding: 0; /* Sin relleno */
          cursor: pointer; /* Cambiar el cursor al pasar por encima */
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
      .display{
        position: absolute; /* Posiciona el elemento de manera absoluta dentro del contenedor padre */
        top: 0; /* Ajusta la posición desde la parte superior */
        left: 0; /* Ajusta la posición desde la izquierda */
        width: 100%; /* Ocupa todo el ancho del contenedor padre */
        height: 100%; /* Ocupa toda la altura del contenedor padre */
        background-color: rgba(0, 0, 0, 0.5); /* Fondo semitransparente */
        z-index: 1; 
      }

      
      
      
      
            
        `;

        // Adjuntar el estilo al shadowRoot
        this.shadowRoot?.appendChild(css);

        const cardDiv = this.ownerDocument.createElement('div');
        cardDiv.className = 'card';

        const image = this.ownerDocument.createElement('img');
        image.src = this.image || '';
        image.alt = 'Character Image';

        const buttonImage = this.ownerDocument.createElement('button');
        buttonImage.className = 'image-button';
        
        buttonImage.appendChild(image);

        cardDiv.appendChild(buttonImage);
        this.shadowRoot.appendChild(cardDiv)

        const popUp = this.ownerDocument.createElement('section')
        popUp.className = 'none';
        
        buttonImage.addEventListener('click', () => {
          // Crear una instancia de Popup
          const popup = new Popup();
      
          // Asignar propiedades al pop-up
          popup.userName = this.userName;
          popup.image = this.image;
          popup.email = this.email;
      
          // Agregar el pop-up al body del documento
          document.body.appendChild(popup);
      });
          
        
        const hidePopUp = () => {
          popUp.classList.remove('popUp');
          popUp.classList.add('none');
      };

        const closeButton = this.ownerDocument.createElement('button');
            closeButton.id = 'button-close'
            closeButton.textContent = 'Close';
            closeButton.addEventListener('click', hidePopUp);

            popUp.appendChild(closeButton);


            this.shadowRoot.appendChild(popUp);
        // Adjuntar la tarjeta al shadowRoot
        
        
      }
    }
  
  
  connectedCallback() {
    this.render();
    
  }
  disconnectedCallback() {
    
  }
 

}
export default Card;
customElements.define('picture-card', Card);