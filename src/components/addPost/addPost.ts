import { ChangeScreen, signUpCompleted } from "../../store/actions";
import { appState, dispatch } from "../../store/store";
import { addPost, createUser } from "../../services/firebase";
import { Screens } from "../../types/navigation";

const formData = {
    image: '',
    description: '',
    name: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    doB: null,
    userId: ''
}

class NewPost extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    connectedCallback() {
        this.render
    
        
    }

  

    changeImage(e: any) {
        console.log(e.target.value)
        formData.image = e?.target?.value
    }
    changeDescription(e: any) {
        console.log(e.target.value)
        formData.description = e?.target?.value
    }

    submitForm() {
        formData.userId = appState.user
        addPost(formData);
           
    }

   

    async render() {
        const style = document.createElement('style');
        style.textContent = `
            :host {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 40%;
                width: 40%;
                box-sizing: border-box;
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
                background-color: #000;
            }

            .login-container {
                padding: 20px;
                background-color: #1E1E1E;
                width: 300px;
                border-radius: 0px;
                box-shadow: 0 0 10px rgba(0,0,0,0.5);
                justify-content: center;
            }

            h2 {
                text-align: center;
                color: white;
                font-family: "Josefin Sans", sans-serif;
            }

            input[type="email"], input[type="password"] {
                width: 93%;
                padding: 10px;
                margin: 8px 0;
                display: block;
                border: none;
                border-radius: 50px;
                background-color: #B2AFA7;
                color: white;
                font-family: "Josefin Sans", sans-serif;
            }

            button {
                width: 48%;
                padding: 10px;
                margin-top: 10px;
                margin-right: 4%;
                border: none;
                border-radius: 50px;
                background-color: #EBE7DC;
                color: #1E1E1E;
                cursor: pointer;
                float: left;
                font-family: "Josefin Sans", sans-serif;
            }

            button:hover {
                background-color: #0A58CA;
            }

            button:last-of-type {
                margin-right: 0;
            }

            .clear {
                clear: both;
            }
        `;

        const container = document.createElement('div');
        container.className = 'container'

        const addButton = document.createElement('input')
        addButton.placeholder = 'Link de imagen';
        addButton.addEventListener("change", this.changeImage);

        const descriptionInput = document.createElement('input')
        descriptionInput.type = 'text';
        descriptionInput.placeholder = 'Description';
        descriptionInput.addEventListener("change", this.changeDescription);
       
        const submitButton = document.createElement('button')
        submitButton.type = 'submit';
        submitButton.innerText = 'Submit';
        submitButton.addEventListener("click", this.submitForm);
        
        container.appendChild(addButton);
        container.appendChild(descriptionInput);
        container.appendChild(submitButton);

        this.shadowRoot?.appendChild(style);
        this.shadowRoot?.appendChild(container);
    }
}

customElements.define('add-post', NewPost);
export default NewPost;
