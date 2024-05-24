import { AddCards } from '../../types/index';
import { addmensajes, getmensajes } from

const FormData: Omit<AddCards, 'id'> = {
	
	message: '',
	
};

class Card extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}