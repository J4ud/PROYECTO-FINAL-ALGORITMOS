import { AddCards } from '../../types/index';
import { getmusic } from '../../services/indexs';
const FormData: Omit<AddCards, 'id'> = {
	image: '',
	pTitle: '',
	Autor: '',
	Album: '',
	Dateadded: '',
	Duration: '',
};

class Songs extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	async render() {
		const songs = await getmusic();
		songs.forEach((song: AddCards) => {
			const container = this.ownerDocument.createElement('section');
			const image = this.ownerDocument.createElement('img');
			image.innerText = song.image;
			container.appendChild(image);

			const pTitle = this.ownerDocument.createElement('H1');
			pTitle.innerText = song.pTitle;
			container.appendChild(pTitle);

			const Autor = this.ownerDocument.createElement('p');
			Autor.innerText = song.Autor;
			container.appendChild(Autor);

			const Album = this.ownerDocument.createElement('p');
			Album.innerText = song.Album;
			container.appendChild(Album);

			const Dateadded = this.ownerDocument.createElement('p');
			Dateadded.innerText = song.Dateadded;
			container.appendChild(Dateadded);

			const Duration = this.ownerDocument.createElement('p');
			Duration.innerText = song.Duration;
			container.appendChild(Duration);

			this.shadowRoot?.appendChild(container);
		});
	}
}

customElements.define('custom-songs', Songs);
export default Songs;