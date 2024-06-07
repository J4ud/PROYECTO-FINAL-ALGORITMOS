import { AddCards } from '../../types/index';
import { getmensajes } from '../../services/indexs';

const FormData: Omit<AddCards, 'id'> = {
   
   message: '',
   
};

class ForosCard extends HTMLElement {
   constructor() {
       super();
       this.attachShadow({ mode: 'open' });
   }

   connectedCallback() {
       this.render();
   }

   async render() {
       const songs = await getmensajes();
       songs.forEach((p: AddCards) => {
           const container = this.ownerDocument.createElement('section');
           

           const message = this.ownerDocument.createElement('p');
           message.innerText =p.message;
           container.appendChild(message);

           this.shadowRoot?.appendChild(container);
       });
   }
}  


// const mensajes = await getmensajes();
//     		mensajes.forEach((p: AddCards) => {
//       		const container = this.ownerDocument.createElement("section");
//       		const name = this.ownerDocument.createElement("h3");
//       		name.innerText = p.message;
//       		container.appendChild(name);

customElements.define('custom-songs', ForosCard);
export default ForosCard;