import Navbar from '../../components/navbar/navbar';
import { MenuButton } from '../../components/index';
import { SidebarMenu } from '../../components/index';
import { appState } from '../../store/store';
import { addObserver } from '../../store/store';
import Foro from '../../components/forosinput/forosinput';
import './foros.css';
import ForosCard  from '../../components/foroscard/foroscard';

class Foros extends HTMLElement {
    navbar: Navbar;
    Menubutton: MenuButton;
    SidebarMenu: SidebarMenu;
    ForosCard: ForosCard;
    Foro: Foro;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        addObserver(this);

      
        this.navbar = new Navbar();
        this.SidebarMenu = new SidebarMenu();
        this.Menubutton = new MenuButton();
        this.ForosCard = new ForosCard();
        this.Foro = new Foro();
        
      
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
        console.log('esto se ve bien');
        const Foro = this.ownerDocument.createElement('custom-foro') as Foro;
        const ForosCard = this.ownerDocument.createElement('foros-card') as ForosCard;
        console.log('esto no');
    
        this.shadowRoot?.appendChild(this.navbar);
        //this.shadowRoot?.appendChild(menuButton);

        this.shadowRoot?.appendChild(sidebarMenu);
        this.shadowRoot?.appendChild(this.Foro);
        this.shadowRoot?.appendChild(this.ForosCard);
        this.shadowRoot?.appendChild(css);
    }

    connectedCallback() {
        console.log('Foros component added to the DOM');
    }
}

customElements.define('app-foros', Foros);
export default Foros;