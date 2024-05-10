import { users } from "../../data/data";

class UserProfile extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    getUserData() {
        // Obtener los datos del usuario activo desde sessionStorage
        const userData = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
        return userData;
    }

    render() {
        // Destructurar los datos de forma segura con valores predeterminados
        const { name = 'Usuario', email = 'Correo no proporcionado', followers = 0, following = 0, posts = 0 } = this.getUserData();
        this.shadowRoot!.innerHTML = `
            <style>
                :host {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    width: 100vw;
                    height: 100vh;
                    background-color: #EBE7DC;
                    flex-wrap: wrap;
                }
                .profile-header {
                    display: flex;
                    flex-direction: row;
                    align-items: stretch;
                    padding: 20px;
                    
                    
                    margin-right: 10%;
                }

                .prf-container{
                    display: flex;
                    justify-content: space-around;

                }

                .profile-id{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around ;
                    padding: 20px;
                    background-color: #fff;
                
                    margin-left: 10%;
                    font-family: "Josefin Sans", sans-serif;
                    font-size: 40px;
                }
                .profile-header img {
                    width: 300px;
                    height: 300px;
                    border-radius: 50%;
                    background: #ccc;
                }
                .profile-stats {
                    text-align: center;
                    padding: 10px;
                }
                .profile-info {
                    display: flex;
                    justify-content: flex-start;
                    width: 100%;
                    font-family: "Josefin Sans", sans-serif;

                }
                .profile-info > div {
                    padding: 10px;
                }
            </style>
            <div class="prf-container">
                <div class="profile-header">
                    <img src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png" alt="Avatar del usuario">
            
                </div>
                <div class=profile-id>
                    <h2 class="name">${name}</h2>
                    <h3 class="email">${email}</h3>
                    <div class="profile-info">${followers} Seguidores</div>
                    <div class="profile-info">${following} Seguidos</div>
                    <div class="profile-info">${posts} Publicaciones</div>
                    </div>
                    
            </div>
            <div >
                
            </div>
        `;
    }
}

customElements.define('app-profile', UserProfile);
export default UserProfile;
