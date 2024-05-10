import { signUpCompleted } from "../../store/actions";
import { dispatch } from "../../store/store";

class SignUpForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    connectedCallback() {
        this.shadowRoot?.querySelector('#suButton')?.addEventListener('click', (event) => {
            event.preventDefault();  // Previene la recarga de la página
            this.handleSubmit();
        });
    }

    handleSubmit() {
        const nameInput = this.shadowRoot?.querySelector('input[placeholder="Name"]') as HTMLInputElement;
        const lastNameInput = this.shadowRoot?.querySelector('input[placeholder="Last Name"]') as HTMLInputElement;
        const emailInput = this.shadowRoot?.querySelector('input[placeholder="Email"]') as HTMLInputElement;
        const passwordInput = this.shadowRoot?.querySelector('input[placeholder="Password"]') as HTMLInputElement;
        const dobInput = this.shadowRoot?.querySelector('input[type="date"]') as HTMLInputElement;

        if (nameInput && lastNameInput && emailInput && passwordInput && dobInput) {
            const user = {
                name: nameInput.value,
                lastName: lastNameInput.value,
                email: emailInput.value,
                password: passwordInput.value,
                dob: dobInput.value
            };

            this.saveUser(user);
            dispatch(signUpCompleted('login'));
        }
    }

    saveUser(user:any) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    render() {
        if(this.shadowRoot)
        this.shadowRoot.innerHTML = `
            <style>
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
            </style>
            <div>
                <h2>SIGN UP</h2>
                <input type="text" placeholder="Name">
                <input type="text" placeholder="Last Name">
                <input type="email" placeholder="Email">
                <input type="password" placeholder="Password">
                <input type="date">
                <button id="suButton" type="submit">Sign Up</button>
            </div>
        `;
    }
}

customElements.define('signup-form', SignUpForm);
export default SignUpForm;
