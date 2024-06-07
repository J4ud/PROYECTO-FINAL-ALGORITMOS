import { formPost } from "../../components";
import NewPost from "../../components/addPost/addPost";
import { ChangeScreen } from "../../store/actions";
import { addObserver, dispatch } from "../../store/store";


// <login></login>
class Posting extends HTMLElement {
    newpost: NewPost
    



  constructor() {
    super();
    this.attachShadow({ mode: 'open'});
    addObserver(this)

    this.newpost= new NewPost();
    
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
      
      
      }
      
      
      `

    const addpostContainer = this.ownerDocument.createElement('div')
      addpostContainer.appendChild(this.newpost)
      this.shadowRoot?.appendChild(addpostContainer)

  
}
}

customElements.define('app-posting', Posting);