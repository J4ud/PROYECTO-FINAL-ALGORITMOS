import { ChangeScreen, signUpCompleted } from "../../store/actions";
import { dispatch } from "../../store/store";
import { createUser } from "../../services/firebase";
import { Screens } from "../../types/navigation";

const formData = {
    name: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    doB: null
}

class addPost extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    connectedCallback() {
        this.render
            this.submitForm();
        
    }

    changeEmail(e: any) {
        console.log(e.target.value)
        formData.email = e?.target?.value
    }

    changeName(e: any) {
        console.log(e.target.value)
        formData.name = e?.target?.value
    }
    changePassword(e: any) {
        console.log(e.target.value)
        formData.password = e?.target?.value
    }
    changeDoB(e: any) {
        console.log(e.target.value)
        formData.doB = e?.target?.value
    }
    changeLastname(e: any) {
        console.log(e.target.value)
        formData.lastName = e?.target?.value
    }
    changeUsername(e: any) {
        console.log(e.target.value)
        formData.userName = e?.target?.value
    }

    async submitForm() {
        try {
            const user = await createUser(formData);
            dispatch(ChangeScreen(Screens.LOGIN)); // Dispatch a la acción de completar el registro
          
        } catch (error) {
            console.error('Error creating user:', error);
        }
    }

   

    render() {
        const style = document.createElement('style');
        style.textContent = `
            :host {
                display: block;
                margin: auto;
                padding: 20px;
                background-color: #1E1E1E;
                color: white;
                font-family: Arial, sans-serif;
                width: 300px;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.5);
    }
        `;

        const container = document.createElement('div');

        const addButton = document.createElement('button')

        const addInput = document.createElement('input')
        addInput.type = 'text';
        addInput.placeholder = 'Description';
       
        

        this.shadowRoot?.appendChild(style);
        this.shadowRoot?.appendChild(container);
    }
}

customElements.define('add-post', addPost);
export default addPost;
