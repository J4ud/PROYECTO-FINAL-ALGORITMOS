// <index></index>
import { appState } from "./store/store";
import { addObserver } from "./store/store";
import  "./screens/dashboard/dashboard";
import "./screens/login/login";
import './screens/signUp/signUp'
import './screens/profile/profile'
import './screens/post/posting'
import './screens/foros/foros'

import { Screens } from "./types/navigation";
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
      case Screens.LOGIN:
        const login = this.ownerDocument.createElement('app-login');
        this.shadowRoot?.appendChild(login)
        break;

        case Screens.DASHBOARD:
          const dashboard = this.ownerDocument.createElement('app-dashboard');
          this.shadowRoot?.appendChild(dashboard)
          break;

          case Screens.SINGUP:
            const signUp = this.ownerDocument.createElement('app-signup');
            this.shadowRoot?.appendChild(signUp)
            break;

            case Screens.PROFILE:
          const profile = this.ownerDocument.createElement('app-profile');
          this.shadowRoot?.appendChild(profile)
          break;

            case Screens.POSTING:
          const posting = this.ownerDocument.createElement('app-posting');
          this.shadowRoot?.appendChild(posting)
          break;

            case Screens.FOROS:
          const forum = this.ownerDocument.createElement('app-foros');
          this.shadowRoot?.appendChild(forum)
          break;

          //   case 'forum':
          // const forum = this.ownerDocument.createElement('app-forum');
          // this.shadowRoot?.appendChild(forum)
          // break;


            
      default:
        break;
    }
  }

}

window.customElements.define('app-container', AppContainer);