import Navbar from '../../components/navbar/navbar';
import { MenuButton } from '../../components/index';
import { SidebarMenu } from '../../components/index';
import { appState } from '../../store/store';
import { addObserver } from '../../store/store';

class Foros extends HTMLElement {
    navbar: Navbar;
    Menubutton: MenuButton;
    SidebarMenu: SidebarMenu;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        addObserver(this);

      
        this.navbar = new Navbar();
        this.SidebarMenu = new SidebarMenu();
        this.Menubutton = new MenuButton();
        
      
        this.render();
    }

    render() {
       
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = '';
        }

        console.log(appState);

        const css = this.ownerDocument.createElement('style');
        css.textContent = `
      
        `;

     
        const sidebarMenu = document.createElement('sidebar-menu');
        
    
        this.shadowRoot?.appendChild(this.navbar);
        //this.shadowRoot?.appendChild(menuButton);

   

     
        this.shadowRoot?.appendChild(sidebarMenu);

       
        this.shadowRoot?.appendChild(css);
    }

    connectedCallback() {
        console.log('Foros component added to the DOM');
    }
}

// Define el elemento personalizado 'app-foros'
customElements.define('app-foros', Foros);
export default Foros;