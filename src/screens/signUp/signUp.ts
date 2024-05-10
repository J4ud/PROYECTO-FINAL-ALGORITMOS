import { SignUpForm } from "../../components/index";
import { signUpCompleted } from "../../store/actions";
import { dispatch, addObserver } from "../../store/store";
import './signUp.css'

// <login></login>
class SignUp extends HTMLElement {
    signUpForm: SignUpForm
    



  constructor() {
    super();
    this.attachShadow({ mode: 'open'});
    addObserver(this)

    this.signUpForm= new SignUpForm();
    
  }
  connectedCallback() {
    this.render();
    
  }
  render() {
  if(this.shadowRoot) this.shadowRoot.innerHTML= `
    `;

    const signUp = document.createElement('signup-form');
    this.shadowRoot?.appendChild(signUp)

  }

  
}


customElements.define('app-signup', SignUp);
