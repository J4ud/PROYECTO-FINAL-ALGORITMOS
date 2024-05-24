import { AddCards } from '../../types/index';
import { addmensajes, getmensajes } from;

const FormData: Omit<AddCards, 'id'> = {
	
	message: '',
	
};

class Card extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}
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
		  @media (min-width: 768px) and (max-width: 1024px) {
			:host {
				max-width: 100%; /* Opcional: puedes ajustar el ancho máximo como prefieras */
				padding: 10px;
			}
			input, button {
				padding: 15px; /* Menor padding para mejor uso del espacio */
			}
			input {
				width: 80%; /* Mayor espacio para el input */
			}
			button {
				width: 20%; /* Ajustar el botón al nuevo ancho de input */
			}
			section {
				padding: 15px; /* Un poco menos de padding para las secciones */
			}
		}

		@media (max-width: 767px) {
			:host {
				margin: 10px; /* Menos margen para usar mejor el espacio */
				padding: 5px; /* Menor padding para todo el componente */
			}
			input, button {
				padding: 10px; /* Padding reducido para input y botón */
			}
			input {
				width: 40%; /* Ajustar ancho del input */
				margin-bottom: 20px; /* Menos margen inferior para compactar */
			}
			button {
				width: 10%; /* Ajustar ancho del botón */
			}
			section {
				margin: 5px 0; /* Menor margen para secciones */
				padding: 10px; /* Menor padding dentro de las secciones */
				border-radius: 3px; /* Menos curvatura para las esquinas */
			}
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

            this.shadowRoot?.appendChild(container);
        });
            }
        }
    }