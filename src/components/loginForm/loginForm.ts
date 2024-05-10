import { dispatch } from "../../store/store";
import { ChangeScreen } from "../../store/actions";

// Definir una interfaz para el usuario
interface User {
    name: string;
    lastName: string;
    email: string;
    password: string;
    dob: string;  // Asume que la fecha de nacimiento también se almacena como string
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
            this.handleLogin();
        });
        this.shadowRoot?.querySelector('#SgButton')?.addEventListener('click', () => {
            dispatch(ChangeScreen('signUp')); // Cambia el estado a 'signUp'
        });
    }

    handleLogin() {
        const emailInput = this.shadowRoot?.querySelector('input[type="email"]') as HTMLInputElement;
        const passwordInput = this.shadowRoot?.querySelector('input[type="password"]') as HTMLInputElement;

        if (emailInput && passwordInput) {
            const email = emailInput.value;
            const password = passwordInput.value;

            const user = this.validateUser(email, password);
            if (user) {
                // Guardar usuario actual en sessionStorage
                sessionStorage.setItem('currentUser', JSON.stringify(user));
                dispatch(ChangeScreen('dashboard')); // Cambia el estado a 'dashboard'
            } else {
                alert('Invalid email or password');
            }
        }
    }

    validateUser(email: string, password: string): User | null {
        const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
        const user = users.find(user => user.email === email && user.password === password);
        return user ? user : null;
    }

    render() {
        this.shadowRoot!.innerHTML = `
            <style>
            <style>
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
        </style>
           
            <div class="login-container">
                <h2>LOG IN</h2>
                <input type="email" placeholder="Email">
                <input type="password" placeholder="Password">
                <button id="logButton">Log In</button>
                <button id="SgButton">Sign Up</button>
                <div class="clear"></div>
            </div>
        `;
    }
}

customElements.define('login-form', LoginForm);
export default LoginForm;
