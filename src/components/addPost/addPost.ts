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

class formPost extends HTMLElement {
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
                display: block;
                position: fixed;
                margin: auto;
                padding: 20px;
                background-color: #1E1E1E;
                color: white;
                font-family: Arial, sans-serif;
                width: 300px;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.5);
                z-index: 9999;
    }
        `;

        const container = document.createElement('div');

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

customElements.define('add-post', formPost);
export default formPost;
