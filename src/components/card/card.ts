import { AddCards } from '../../types/index';
import { addmensajes, getmensajes } from '../../services/indexs';

const FormData: Omit<AddCards, 'id'> = {
	
	message: '',
	
};

class Card extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}
	changemessage(e: any) {
		console.log(e?.target?.value);
		
		FormData.message = e?.target?.value;
	}


	submitForm() {
		console.log(FormData);
		
		addmensajes(FormData);
	}

	async render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = ` 
			<style>
			:host {
            display: block;
            font-family: 'Arial', sans-serif;
            max-width: 90%;
            margin: 30px;
            padding: 20px;
            border-radius: 10px;
            background-color: #fff;
          }
          input {
            width: 90%;
            padding: 20px;
            border-radius: 20px 0 0 20px;
            box-sizing: border-box;
			margin-bottom: 40px;
			background-color: #191916;
			color: #FFFFFF; 
          }
          input:focus, button:focus {
            outline: none;
            border-color: #6658D3;
          }
          button {
			width: 10%;
            background-color: #191916;
            color: white;
            cursor: pointer;
			padding: 20px;
            margin-top: 10px;
            border-radius: 0 20px 20px 0;
            transition: background-color 0.3s;
          }
          button:hover {
            background-color: #45453E;
          }
          section {
            margin: 10px 0;
            padding: 20px;
            background-color: #191916;
			border-radius: 5px;
            
          }
          p {
            margin: 0;
			color: #FFFFFF;
          }
        
		  </style>
		  `;

		  const inputContainer = document.createElement('div');
		  inputContainer.classList.add('input-container');

			const message = this.ownerDocument.createElement('input');
			message.placeholder = 'Escribe un mensaje...';
			message.addEventListener('change', this.changemessage);
			this.shadowRoot?.appendChild(message);
			

			const save = this.ownerDocument.createElement('button');
			save.innerText = 'ADD';
			save.addEventListener('click', this.submitForm);
			this.shadowRoot?.appendChild(save);

			// const songs = this.ownerDocument.createElement('custom-songs');
			// this.shadowRoot?.appendChild(songs);

			const messagesContainer = document.createElement('div');
        	messagesContainer.id = 'messages';

			const mensajes = await getmensajes();
    		mensajes.forEach((p: AddCards) => {
      		const container = this.ownerDocument.createElement("section");
      		const name = this.ownerDocument.createElement("p");
      		name.innerText = p.message;
      		container.appendChild(name);

    

      this.shadowRoot?.appendChild(container);
    });
		}
	}
}

customElements.define('custom-card', Card);
export default Card;
