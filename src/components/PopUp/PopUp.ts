// <banner></banner>
import CloseButton from '../Closebutton/Closebutton'; // Importar el componente del botón de cerrar

import styles from './Popup.css'
export enum Attr {
  'userName' = 'userName',
  'uid'= 'uid',
  'image'= 'image',
  'email'= 'email',
  'description'= 'description',
  'gender'= 'gender',
  'ip_address'='ip_address'
}

class Popup extends HTMLElement {
  
    uid?: number;
    userName?:string ;
    image?: string;
    description?: string;
    email?: string;
    gender?: string;
    ip_address?: string;

  constructor() {
    super(); // always call super() first in the ctor.
    this.attachShadow({mode: 'open'})  
  };

  static get observedAttributes(){
    const attrs: Record<Attr,null> = {
      uid: null,
      userName: null,
      image: null,
      description: null,
      email: null,
      gender: null,
      ip_address: null,
    }
    return Object.keys(attrs);
    };

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
    };
  

  render(){
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = '';
        // Limpiar el contenido existente en el shadowRoot
        this.shadowRoot.innerHTML = `
          <div class="popUp">
            <div class="popup-content">
              <img src="${this.image}" alt="User Image">

              <div class="popup-text">
                <h2>${this.userName}</h2>
                <p>Email: ${this.email}</p>
                <p>${this.description}</p>
              </div>
              
              <close-button class="close-button"></close-button>
            </div>
          </div>
        `;

        
        // Insertar el botón de cierre en el DOM de la sombra
        

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
              position: fixed;
              background-color: #1A1916;
              height: 500px;
              width: 800px;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
              display: flex
          }

              .popup-content img{
                flex: 1;
             height: 90%;
             position: absolute;
             max-width: 50%;
             min-width: 50%;
             object-fit: contain;
              }
            
            .close-button{
              color: #EBE7DC;
              z-index:1;
              position: absolute;
              right: 3%;
              background-color: 0%;
              width: 20px;
              height: 20px;
      
            }
            .circle {
              width: 20px; /* Cambia el tamaño del círculo según sea necesario */
              height: 20px; /* Cambia el tamaño del círculo según sea necesario */
              border-radius: 50%; /* Hace que el elemento sea un círculo */
              background-color: black; /* Cambia el color del círculo según sea necesario */
            }
            .popup-text{
              margin-left:60%;
            }
            .popup-content h2{
              z-index: 1;
              color: #EBE7DC;
              font-size: 40px;
              font-family: "Josefin Sans", sans-serif;
              letter-spacing: 2px;
            
            }
            .popup-content p{
              z-index: 1;
              color: #EBE7DC;
              font-size: 20px;
              margin-left:0%;
            }
            @media (max-width: 720px) {
              .popup-content {
                width: 90%; /* Reducir el ancho del popup en pantallas pequeñas */
                flex-direction: column; /* Cambia a distribución vertical */
                align-items: flex-start; /* Alinea los elementos a la izquierda */
                top: 120px;
              }
              .popup-content img {
                margin-right: 0; /* Elimina el espacio entre la imagen y el texto */
                margin-bottom: 10px; /* Añade espacio entre la imagen y el texto */
                width: 80%;
                height: 80%;
              }
            }
            @media (max-width: 480px) {
              .popUp {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                 width: 70%;
              }
              .popup-content {
                flex-direction: column; /* Cambiar a disposición vertical */
                align-items: center; /* Centrar horizontalmente */
                top: 50px;
              }
              .popup-content h2 {
                position: absolute; /* Establecer posición absoluta para colocar el h2 encima de la imagen */
                top: 50%; /* Colocar el h2 en el centro vertical */
                left: 50%; /* Colocar el h2 en el centro horizontal */
                transform: translate(-50%, -50%); /* Centrar el h2 */
                z-index: 1; /* Asegurar que el h2 esté por encima de la imagen */
                top: 15px;
                font-size: 20px;
                
              }
              .popup-content img {
                max-width: 50%; /* Reducir más el tamaño de la imagen */
                margin-bottom: 2px; /* Agregar espacio entre la imagen y el título */
              }
              .popup-content p {
                display: none; /* Ocultar el texto */
              }
            }
        `;

        this.shadowRoot?.appendChild(css);

        const Closebutton = new CloseButton;

        const closeButton = this.shadowRoot?.querySelector('.close-button');
    closeButton?.addEventListener('click', () => {
      this.remove(); // Remover el pop-up del DOM al hacer clic en el botón
    });
        
 }
}
connectedCallback() {
  this.render()
  // Agrega el event listener al botón de cerrar el pop-up
  const closeButton = this.shadowRoot?.querySelector('close-button');
  closeButton?.addEventListener('click', this.close.bind(this));
}

close() {
  this.parentNode?.removeChild(this);
}

}

export default Popup;
window.customElements.define('my-popup', Popup);