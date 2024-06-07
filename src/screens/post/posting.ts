import { formPost } from "../../components";
import NewPost from "../../components/addPost/addPost";
import { ChangeScreen } from "../../store/actions";
import { addObserver, dispatch } from "../../store/store";
import SearchBar from "../../components/searchBar/searchBar";
import Navbar from "../../components/navbar/navbar";
import {MenuButton} from "../../components";
import {SidebarMenu} from "../../components";

// <login></login>
class Posting extends HTMLElement {
    newpost: NewPost
    searchBar: SearchBar;
    navbar: Navbar;
    
    Menubutton: MenuButton;
    SidebarMenu: SidebarMenu;
    



  constructor() {
    super();
    this.attachShadow({ mode: 'open'});
    addObserver(this)

    this.newpost= new NewPost();
    this.searchBar = new SearchBar();
    this.navbar = new Navbar();
    this.SidebarMenu = new SidebarMenu();
    this.Menubutton = new MenuButton();

    
  }
  connectedCallback() {
    this.render();
    // Asegurarse que el contenido está completamente renderizado
    
      
    ;
  }


  render() {
  const css = this.ownerDocument.createElement('style');
      css.textContent = `
      :host{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #000
      }
      
      .addpost-container{
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      }
      
      `
      if (this.shadowRoot){
      this.shadowRoot.innerHTML = '';

      const sidebarMenu = document.createElement('sidebar-menu');
      const navbarContainer = this.ownerDocument.createElement('div');
      navbarContainer.id = 'navbar-container';
      navbarContainer.appendChild(this.navbar);
      
      
      
      
      this.shadowRoot?.appendChild(navbarContainer);
      this.shadowRoot?.appendChild(css);
      this.shadowRoot?.appendChild(sidebarMenu);

    const addpostContainer = this.ownerDocument.createElement('div')
    addpostContainer.className = 'addpost-container'
      addpostContainer.appendChild(this.newpost)
      this.shadowRoot?.appendChild(addpostContainer)

      }
}
}

customElements.define('app-posting', Posting);