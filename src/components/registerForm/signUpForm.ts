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

    changePassword(e: any) {
        console.log(e.target.value)
        formData.password = e?.target?.value
    }

    async submitForm() {
        try {
            const user = await CreateUser(formData);
            this.saveUser(user);
            dispatch(ChangeScreen('login')); // Dispatch a la acción de completar el registro
          
        } catch (error) {
            console.error('Error creating user:', error);
        }
    }

    saveUser(user: any) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
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

        const lastNameInput = document.createElement('input');
        lastNameInput.type = 'text';
        lastNameInput.placeholder = 'Last Name';

        const emailInput = document.createElement('input');
        emailInput.type = 'email';
        emailInput.placeholder = 'Email';
        emailInput.addEventListener("change", this.changeEmail.bind(this));

        const passwordInput = document.createElement('input');
        passwordInput.type = 'password';
        passwordInput.placeholder = 'Password';
        passwordInput.addEventListener("change", this.changePassword.bind(this));

        const dobInput = document.createElement('input');
        dobInput.type = 'date';

        const signUpButton = document.createElement('button');
        signUpButton.id = 'suButton';
        signUpButton.type = 'submit';
        signUpButton.innerText = 'Sign Up';
        signUpButton.addEventListener("click", this.submitForm.bind(this));

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
