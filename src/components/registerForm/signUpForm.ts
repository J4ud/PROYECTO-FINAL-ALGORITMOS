import { ChangeScreen, signUpCompleted } from "../../store/actions";
import { dispatch } from "../../store/store";
import { CreateUser } from "../../services/firebase";

const formData = {
    name: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    doB: null
}

class SignUpForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    connectedCallback() {
        this.shadowRoot?.querySelector('#suButton')?.addEventListener('click', (event) => {
            event.preventDefault();  // Previene la recarga de la página
            this.submitForm();
        });
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
        formData.username = e?.target?.value
    }

    async submitForm() {
        try {
            const user = await CreateUser(formData);
            dispatch(ChangeScreen('login')); // Dispatch a la acción de completar el registro
          
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
            h2 {
                text-align: center;
            }
            input[type="text"], input[type="email"], input[type="password"], input[type="date"] {
                width: calc(100% - 20px);
                padding: 10px;
                margin: 10px 0;
                border: none;
                border-radius: 50px;
                background-color: #B2AFA7;
            }
            button {
                width: 100%;
                padding: 10px;
                margin-top: 20px;
                border: none;
                border-radius: 0px;
                background-color: #EBE7DC;
                color: #1E1E1E;
                cursor: pointer;
            }
            button:hover {
                background-color: black;
            }
        `;

        const container = document.createElement('div');

        const title = document.createElement('h2');
        title.innerText = 'SIGN UP';

        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.placeholder = 'Name';
        nameInput.addEventListener("change", this.changeName);

        const usernameInput = document.createElement('input');
        usernameInput.type = 'text';
        usernameInput.placeholder = 'Usersame';
        usernameInput.addEventListener("change", this.changeUsername);

        const lastNameInput = document.createElement('input');
        lastNameInput.type = 'text';
        lastNameInput.placeholder = 'Last Name';
        lastNameInput.addEventListener("change", this.changeLastname);

        const emailInput = document.createElement('input');
        emailInput.type = 'email';
        emailInput.placeholder = 'Email';
        emailInput.addEventListener("change", this.changeEmail);

        const passwordInput = document.createElement('input');
        passwordInput.type = 'password';
        passwordInput.placeholder = 'Password';
        passwordInput.addEventListener("change", this.changePassword);

        const dobInput = document.createElement('input');
        dobInput.type = 'date';
        dobInput.addEventListener("change", this.changeDoB);

        const signUpButton = document.createElement('button');
        signUpButton.id = 'suButton';
        signUpButton.type = 'submit';
        signUpButton.innerText = 'Sign Up';
        signUpButton.addEventListener("click", this.submitForm);

        container.appendChild(usernameInput);
        container.appendChild(title);
        container.appendChild(nameInput);
        container.appendChild(lastNameInput);
        container.appendChild(emailInput);
        container.appendChild(passwordInput);
        container.appendChild(dobInput);
        container.appendChild(signUpButton);

        this.shadowRoot?.appendChild(style);
        this.shadowRoot?.appendChild(container);
    }
}

customElements.define('signup-form', SignUpForm);
export default SignUpForm;
