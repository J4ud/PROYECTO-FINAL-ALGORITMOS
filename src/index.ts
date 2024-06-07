// <index></index>
import { appState } from "./store/store";
import { addObserver } from "./store/store";
import  "./screens/dashboard/dashboard";
import "./screens/login/login";
import "./screens/signUp/signUp";
import "./screens/foros/foros";

class AppContainer extends HTMLElement {
  constructor() {
    super(); // always call super() first in the ctor.
    this.attachShadow({ mode: 'open'})
    addObserver(this);
    
  }
  connectedCallback() {
    this.render()
  }
  render() {
    if (this.shadowRoot) 
      this.shadowRoot.innerHTML= ''
    switch (appState.screen) {
      case 'login':
        const login = this.ownerDocument.createElement('app-login');
        this.shadowRoot?.appendChild(login)
        break;

        case 'dashboard':
          const dashboard = this.ownerDocument.createElement('app-dashboard');
          this.shadowRoot?.appendChild(dashboard)
          break;

          case 'signUp':
            const signUp = this.ownerDocument.createElement('app-signup');
            this.shadowRoot?.appendChild(signUp)
            break;

            case 'profile':
          const profile = this.ownerDocument.createElement('app-profile');
          this.shadowRoot?.appendChild(profile)
          break;

            case 'forum':
          const forum = this.ownerDocument.createElement('app-forum');
          this.shadowRoot?.appendChild(forum)
          break;

          case 'profiles':
          const profiles = this.ownerDocument.createElement('app-profiles');
          this.shadowRoot?.appendChild(profiles)
          break;


            
      default:
        break;
    }
  }

}

window.customElements.define('app-container', AppContainer);