import { AddCards } from '../../types/index';
import { addmensajes, getmensajes } from;

const FormData: Omit<AddCards, 'id'> = {
	
	message: '',
	
};

class Card extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}
}

connectedCallback() {
    this.render();
}
changemessage(e: any) {
    console.log(e?.target?.value);
    
    FormData.message = e?.target?.value;
}

submitForm() {
    console.log(FormData);
    
    addmensajes(FormData);
}
