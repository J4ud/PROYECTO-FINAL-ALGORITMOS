import { dispatch } from "../../store/store";
import { ChangeScreen } from "../../store/actions";
import { login } from "../../services/firebase";
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
        this.render();
    }

    connectedCallback() {
        this.shadowRoot?.querySelector('#logButton')?.addEventListener('click', (event) => {
            event.preventDefault(); // Previene el comportamiento por defecto del formulario
            
        });
        this.shadowRoot?.querySelector('#SgButton')?.addEventListener('click', () => {
            dispatch(ChangeScreen('signUp')); // Cambia el estado a 'signUp'
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
            const user = await login(formData);
            dispatch(ChangeScreen('login')); // Dispatch a la acción de completar el registro
          
        } catch (error) {
            console.error('Error creating user:', error);
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
