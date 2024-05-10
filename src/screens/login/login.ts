import { LoginForm } from "../../components/index";
import { ChangeScreen } from "../../store/actions";
import { addObserver, dispatch } from "../../store/store";


// <login></login>
class Login extends HTMLElement {
    loginForm: LoginForm
    



  constructor() {
    super();
    this.attachShadow({ mode: 'open'});
    addObserver(this)

    this.loginForm= new LoginForm();
    
  }
  connectedCallback() {
    this.render();
    // Asegurarse que el contenido está completamente renderizado
    
      
    ;
  }


  render() {
  if(this.shadowRoot) this.shadowRoot.innerHTML= `
    <login-bg>
    </login-bg>
    <login-form></login-form>`;
  }
  
}


customElements.define('app-login', Login);