import { AddCards } from '../../types/index';
import { addmensajes, getmensajes } from '../../services/indexs';
import './forosinput.css';
import './foroscard';

const FormData: Omit<AddCards, 'id'> = {
  message: '',
};

class Foro extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.changemessage = this.changemessage.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  connectedCallback() {
    this.render();
  }

  changemessage(e: Event) {
    const target = e.target as HTMLInputElement;
    FormData.message = target.value;
  }

  async submitForm() {
    await addmensajes(FormData);
    this.render(); // Re-render to update the message list
  }

  async render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            font-family: 'Arial', sans-serif;
            max-width: 100%;
            margin: 60px;
            padding: 20px;
            border-radius: 15px;
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
          @media (max-width: 720px) {
            input {
              width: 70%;
              padding: 15px;
              border-radius: 15px 0 0 15px;
            }
            button {
              width: 30%;
              padding: 15px;
            }
          }
          @media (max-width: 480px) {
            input {
              width: 60%;
              padding: 10px;
              border-radius: 10px 0 0 10px;
            }
            button {
              width: 40%;
              padding: 10px;
            }
          }
        </style>
      `;

      const inputContainer = document.createElement('div');
      inputContainer.classList.add('input-container');

      const message = this.ownerDocument.createElement('input');
      message.placeholder = 'Escribe un mensaje...';
      message.addEventListener('change', this.changemessage);
      inputContainer.appendChild(message);

      const save = this.ownerDocument.createElement('button');
      save.innerText = 'ADD';
      save.addEventListener('click', this.submitForm);
      inputContainer.appendChild(save);

      this.shadowRoot.appendChild(inputContainer);

      const messagesContainer = document.createElement('div');
      messagesContainer.id = 'messages';
      this.shadowRoot.appendChild(messagesContainer);

      const mensajes = await getmensajes();
      mensajes.forEach((p: AddCards) => {
        const forosCard = this.ownerDocument.createElement('foros-card');
        forosCard.setAttribute('message', p.message);
        messagesContainer.appendChild(forosCard);
      });
    }
  }
}

customElements.define('custom-foro', Foro);
export default Foro;
