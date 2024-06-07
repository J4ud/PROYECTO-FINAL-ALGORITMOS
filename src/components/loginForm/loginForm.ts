import { dispatch } from "../../store/store";
import { ChangeScreen } from "../../store/actions";
import { login } from "../../services/firebase";
import { Screens } from "../../types/navigation";

// Definir una interfaz para el usuario
interface User {
    name: string;
    lastName: string;
    email: string;
    password: string;
    dob: string;  // Asume que la fecha de nacimiento también se almacena como string
}

const formData = {
    name: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    doB: null
}

class LoginForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();

        const emailInput = this.shadowRoot?.querySelector('input[type="email"]');
        const passwordInput = this.shadowRoot?.querySelector('input[type="password"]');
        const loginButton = this.shadowRoot?.querySelector('#logButton');

        emailInput?.addEventListener('input', this.changeEmail.bind(this));
        passwordInput?.addEventListener('input', this.changePassword.bind(this));
        loginButton?.addEventListener('click', this.submitForm.bind(this));
    }

    changeEmail(e: Event) {
        const target = e.target as HTMLInputElement;
        formData.email = target.value;
    }

    changePassword(e: Event) {
        const target = e.target as HTMLInputElement;
        formData.password = target.value;
    }

    async submitForm(event: Event) {
        event.preventDefault();
        try {
            const user = await login(formData);
            console.log('User logged in:', user);
            dispatch(ChangeScreen(Screens.DASHBOARD)); // Dispatch a la acción de completar el registro
        } catch (error) {
            console.error('Error logging user:', error);
        }
    }

    render() {
        const style = document.createElement('style');
        style.textContent = `
            :host {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                width: 100vw;
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

        const loginContainer = this.ownerDocument.createElement('div');
        loginContainer.className = 'login-container';

        const loginTitle = this.ownerDocument.createElement('h2');
        loginTitle.innerText = 'LOG IN';

        const emailInput = this.ownerDocument.createElement('input');
        emailInput.type = 'email';
        emailInput.placeholder = 'Email';

        const passwordInput = this.ownerDocument.createElement('input');
        passwordInput.type = 'password';
        passwordInput.placeholder = 'Password';

        const loginButton = this.ownerDocument.createElement('button');
        loginButton.id = 'logButton';
        loginButton.innerText = 'Log In';

        const signUpButton = this.ownerDocument.createElement('button');
        signUpButton.id = 'SgButton';
        signUpButton.innerText = 'Sign Up';

        const clearDiv = this.ownerDocument.createElement('div');
        clearDiv.className = 'clear';

        loginContainer.appendChild(loginTitle);
        loginContainer.appendChild(emailInput);
        loginContainer.appendChild(passwordInput);
        loginContainer.appendChild(loginButton);
        loginContainer.appendChild(signUpButton);
        loginContainer.appendChild(clearDiv);

        this.shadowRoot!.appendChild(style);
        this.shadowRoot!.appendChild(loginContainer);
    }
}

customElements.define('login-form', LoginForm);
export default LoginForm;
