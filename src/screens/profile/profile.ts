import '../dashboard/dashboard.css';
import { Attr } from '../../components/PopUp/PopUp';
import { appState, addObserver, dispatch } from '../../store/store';
import { getPostsAction, getPostsProfileAction } from '../../store/actions';
import MenuButton from '../../components/MenuButton/MenuButton';
import SidebarMenu from '../../components/Menu/menu';
import UserProfile from '../../components/userProfile/userProfile';
import Navbar from '../../components/navbar/navbar';
import { Card, NewPost } from '../../components';

import { postsProfile } from '../../components';
import '../../components/index';

class Profile extends HTMLElement {
  navbar: Navbar;
  Menubutton: MenuButton;
  SidebarMenu: SidebarMenu;
  userprofile: UserProfile;
  

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    addObserver(this);

    this.navbar = new Navbar();
    this.SidebarMenu = new SidebarMenu();
    this.Menubutton = new MenuButton();
    this.userprofile = new UserProfile();
   

    this.render();
  }

  async connectedCallback() {
    if (appState.postsProfile.length === 0) {
      const action = await getPostsProfileAction(appState.user);
      dispatch(action);}
      else {
        this.render();  

    }
  }

  render() {
    if (this.shadowRoot) {
      // Limpiar el contenido existente en el shadowRoot
      this.shadowRoot.innerHTML = '';

      const css = this.ownerDocument.createElement('style');
      css.textContent = `
        /* Puedes agregar aquí los estilos específicos */
      `;
      this.shadowRoot.appendChild(css);

      const userProfile = this.ownerDocument.createElement('user-profile');
      this.shadowRoot.appendChild(userProfile);

      

      const cardsContainer = this.ownerDocument.createElement('div');
      cardsContainer.className = 'cards-container';

      appState.postsProfile.forEach((post: any) => {
        const postsProfile = new Card();
        postsProfile.setAttribute(Attr.image, post.image);
        postsProfile.setAttribute(Attr.userName, post.userName);
        postsProfile.setAttribute(Attr.description, post.description);
        postsProfile.className = 'postsProfile';
        cardsContainer.appendChild(postsProfile);
      });

      this.shadowRoot.appendChild(cardsContainer);
    }
  }
}

customElements.define('app-profile', Profile);
export default Profile;
