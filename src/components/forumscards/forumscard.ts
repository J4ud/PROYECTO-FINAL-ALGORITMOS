import { AddCards } from '../../types/types';
import { addmusic } from '../../services/foro';
const FormData: Omit<AddCards, 'id'> = {
	image: '',
	pTitle: '',
	Autor: '',
	Album: '',
	Dateadded: '',
	Duration: '',
};

class Card extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}
	changeimage(e: any) {
		FormData.pTitle = e?.target?.value;
	}
	changepTitle(e: any) {
		FormData.image = e?.target?.value;
	}
	changeAutor(e: any) {
		FormData.Autor = e?.target?.value;
	}
	changeAlbum(e: any) {
		FormData.Album = e?.target?.value;
	}
	changeDateadded(e: any) {
		FormData.Dateadded = e?.target?.value;
	}
	changeDuration(e: any) {
		FormData.Duration = e?.target?.value;
	}

	submitForm() {
		addmusic(FormData);
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = ``;

			const title = this.ownerDocument.createElement('h1');
			title.innerText = 'Añade una cancion';
			this.shadowRoot?.appendChild(title);

			const image = this.ownerDocument.createElement('input');
			image.type = 'file';
			image.addEventListener('change', this.changeimage);
			this.shadowRoot?.appendChild(image);

			const pTitle = this.ownerDocument.createElement('input');
			pTitle.placeholder = 'Title';
			pTitle.addEventListener('change', this.changepTitle);
			this.shadowRoot?.appendChild(pTitle);

			const Autor = this.ownerDocument.createElement('input');
			Autor.placeholder = 'Autor';
			Autor.addEventListener('change', this.changeAutor);
			this.shadowRoot?.appendChild(Autor);

			const Album = this.ownerDocument.createElement('input');
			Album.placeholder = 'Album';
			Album.addEventListener('change', this.changeAlbum);
			this.shadowRoot?.appendChild(Album);

			const Dateadded = this.ownerDocument.createElement('input');
			Dateadded.placeholder = 'Date added';
			Dateadded.addEventListener('change', this.changeDateadded);
			this.shadowRoot?.appendChild(Dateadded);

			const Duration = this.ownerDocument.createElement('input');
			Duration.placeholder = 'Duration';
			Duration.addEventListener('change', this.changeDuration);
			this.shadowRoot?.appendChild(Duration);

			const save = this.ownerDocument.createElement('button');
			save.innerText = 'ADD';
			save.addEventListener('click', this.submitForm);
			this.shadowRoot?.appendChild(save);

			const songs = this.ownerDocument.createElement('custom-songs');
			this.shadowRoot?.appendChild(songs);
		}
	}
}

customElements.define('custom-card', Card);
export default Card;