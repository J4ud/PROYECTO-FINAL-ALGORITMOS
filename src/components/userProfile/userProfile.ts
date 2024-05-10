import { dispatch } from "../../store/store";
import { ChangeScreen } from "../../store/actions"; 
class UserProfile extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();

        this.shadowRoot?.querySelector('#profile')?.addEventListener('click', () => {
            dispatch(ChangeScreen('profile')); // Cambia el estado a 'signUp'
        })
        
    }

    getUserData() {
        // Aquí asumimos que el usuario activo se guarda en Local Storage bajo la clave 'currentUser'
        const userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
        return userData;
    }

    render() {
        const { username, followers = 0, following = 0, posts = 0 } = this.getUserData();
        this.shadowRoot!.innerHTML = `
            <style>
                :host {
                    display: block;
                    font-family: Arial, sans-serif;
                    width: 100%;
                    max-width: 768px; /* Ajusta este valor según tus necesidades de diseño */
                    margin: auto;
                    background-color: #fff;
                    box-shadow: 0 0 8px rgba(0,0,0,0.1);
                }
                .profile-header {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 20px;
                    border-bottom: 1px solid #ccc;
                }
                .profile-header img {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    background: #ccc;
                }
                .profile-stats {
                    text-align: center;
                    padding: 10px;
                }
                .gallery {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 10px;
                    padding: 10px;
                }
                .gallery img {
                    width: 100%;
                    height: auto;
                }
            </style>
            <div class="profile-header">
                <img src="default-avatar.png" alt="User avatar">
                <h2>${username || 'Username'}</h2>
                <div class="profile-stats">
                    <span>${followers} Followers</span> • <span>${following} Followed</span> • <span>${posts} Publications</span>
                </div>
            </div>
            <div class="gallery">
                <!-- Aquí irían las imágenes de las publicaciones del usuario, puedes ajustar según la lógica de obtención de imágenes -->
                <img src="post1.jpg" alt="Post 1">
                <img src="post2.jpg" alt="Post 2">
                <img src="post3.jpg" alt="Post 3">
            </div>
        `;
    }
}

customElements.define('user-profile', UserProfile);
export default UserProfile
