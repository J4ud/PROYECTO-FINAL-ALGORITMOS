
import { AddCards } from '../../types/index';
import { addmensajes } from '../../services/firebase';
import '../forosinput/forosinput'

const FormData: Omit<AddCards, 'id'> = {
  message: '',
};

  class ForosCard extends HTMLElement {

    constructor() {
	super();
		this.attachShadow({ mode: 'open' });
	}

  static get observedAttributes() {
    return ['message'];
  }

 

  connectedCallback() {
    this.render();
  }

  changemessage(e: any) {
 FormData.message = e?.target?.value;
 } 
 submitForm() {
    	addmensajes(FormData);
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
       
      `;
      

      const message = this.ownerDocument.createElement('input');
      message.placeholder = 'Escribe un mensaje...';
      message.addEventListener('change', this.changemessage);
      this.shadowRoot?.appendChild(message);
      
      const save = this.ownerDocument.createElement('button');
      save.innerText = 'ADD';
      save.addEventListener('click', this.submitForm);
      this.shadowRoot?.appendChild(save);

      const messagesContainer = document.createElement('div');
      messagesContainer.id = 'messages';
      this.shadowRoot.appendChild(messagesContainer);
    }
  }
}

customElements.define('foros-card', ForosCard);
export default ForosCard;